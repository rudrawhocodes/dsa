import { AVLTreeGenerator } from './trees/avl'

export interface Algorithm {
  id: string
  name: string
  category: 'sorting' | 'searching' | 'trees' | 'graphs'
  description: string
  premium: boolean
  generator?: any
}

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list.',
    premium: false,
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    description: 'Efficient algorithm for finding an item in a sorted list.',
    premium: false,
  },
  {
    id: 'avl-tree',
    name: 'AVL Tree',
    category: 'trees',
    description: 'Self-balancing binary search tree with automatic rebalancing.',
    premium: true,
    generator: AVLTreeGenerator,
  },
]

export function getAlgorithm(id: string): Algorithm | undefined {
  return algorithms.find(algo => algo.id === id)
}

export function getAlgorithmsByCategory(category: string): Algorithm[] {
  return algorithms.filter(algo => algo.category === category)
}

export function getPremiumAlgorithms(): Algorithm[] {
  return algorithms.filter(algo => algo.premium)
}