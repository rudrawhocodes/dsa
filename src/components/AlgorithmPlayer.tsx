'use client'

import { useState, useEffect } from 'react'
import { Algorithm } from '@/lib/algorithms'
import { AlgorithmEvent, NodeState } from '@/lib/algorithms/trees/avl'
import { codeSamples } from '@/lib/codeSamples'

interface AlgorithmPlayerProps {
  algorithm: Algorithm
}

export default function AlgorithmPlayer({ algorithm }: AlgorithmPlayerProps) {
  const [events, setEvents] = useState<AlgorithmEvent[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [inputValues, setInputValues] = useState<string>('10,20,30,40,50,25')
  const [selectedLanguage, setSelectedLanguage] = useState('java')

  const currentEvent = events[currentStep]

  const generateVisualization = () => {
    if (!algorithm.generator) {
      alert('This algorithm does not have a visualization generator yet.')
      return
    }

    try {
      const values = inputValues.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
      if (values.length === 0) {
        alert('Please enter valid numbers separated by commas.')
        return
      }

      const generator = new algorithm.generator()
      const newEvents = generator.generateInsertionSequence(values)
      setEvents(newEvents)
      setCurrentStep(0)
    } catch (error) {
      console.error('Error generating visualization:', error)
      alert('Error generating visualization. Please try again.')
    }
  }

  const playAnimation = () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= events.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const resetVisualization = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const nextStep = () => {
    if (currentStep < events.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderTreeVisualization = (nodeStates: NodeState[]) => {
    if (!nodeStates || nodeStates.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No nodes to display</p>
        </div>
      )
    }

    return (
      <div className="relative bg-gray-50 rounded-lg p-4 overflow-auto" style={{ minHeight: '400px' }}>
        <svg width="800" height="400" className="mx-auto">
          {/* Render edges first */}
          {nodeStates.map(node => (
            <g key={`edges-${node.id}`}>
              {node.leftId && nodeStates.find(n => n.id === node.leftId) && (
                <line
                  x1={node.x || 0}
                  y1={node.y || 0}
                  x2={nodeStates.find(n => n.id === node.leftId)!.x || 0}
                  y2={nodeStates.find(n => n.id === node.leftId)!.y || 0}
                  stroke="#374151"
                  strokeWidth="2"
                />
              )}
              {node.rightId && nodeStates.find(n => n.id === node.rightId) && (
                <line
                  x1={node.x || 0}
                  y1={node.y || 0}
                  x2={nodeStates.find(n => n.id === node.rightId)!.x || 0}
                  y2={nodeStates.find(n => n.id === node.rightId)!.y || 0}
                  stroke="#374151"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}
          
          {/* Render nodes */}
          {nodeStates.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x || 0}
                cy={node.y || 0}
                r="20"
                fill={currentEvent?.focusNodeId === node.id ? "#ef4444" : "#3b82f6"}
                stroke="#1f2937"
                strokeWidth="2"
              />
              <text
                x={node.x || 0}
                y={node.y || 0}
                textAnchor="middle"
                dy="0.3em"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {node.value}
              </text>
              <text
                x={node.x || 0}
                y={(node.y || 0) + 35}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="10"
              >
                h:{node.height}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  const algorithmCodeSamples = codeSamples[algorithm.id] || []

  return (
    <div className="space-y-8">
      {/* Input and Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Input & Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Values to Insert (comma-separated)
            </label>
            <input
              type="text"
              value={inputValues}
              onChange={(e) => setInputValues(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10,20,30,40,50,25"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateVisualization}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Generate Visualization
            </button>
          </div>
        </div>

        {events.length > 0 && (
          <div className="flex items-center space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={playAnimation}
              disabled={isPlaying || currentStep >= events.length - 1}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? 'Playing...' : 'Play'}
            </button>
            
            <button
              onClick={nextStep}
              disabled={currentStep >= events.length - 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            
            <button
              onClick={resetVisualization}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {events.length}
            </div>
          </div>
        )}
      </div>

      {/* Visualization */}
      {currentEvent && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Visualization</h3>
          
          {algorithm.category === 'trees' ? (
            renderTreeVisualization(currentEvent.nodeStates)
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Visualization for {algorithm.category} algorithms coming soon</p>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Current Step</h4>
            <p className="text-blue-800">{currentEvent.explanation}</p>
            <div className="mt-2 text-sm text-blue-700">
              Rotations: {currentEvent.meta.rotations} | Inserts: {currentEvent.meta.inserts}
            </div>
          </div>
        </div>
      )}

      {/* Code Samples */}
      {algorithmCodeSamples.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Code Implementation</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithmCodeSamples.map(sample => (
                <option key={sample.language} value={sample.language}>
                  {sample.language.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>
                {algorithmCodeSamples.find(s => s.language === selectedLanguage)?.code}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}