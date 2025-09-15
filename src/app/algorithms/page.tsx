import Link from 'next/link'
import { algorithms } from '@/lib/algorithms'
import { getCurrentUser } from '@/lib/auth/utils'

export default async function AlgorithmsPage() {
  const user = await getCurrentUser()
  const hasActiveSubscription = user?.subscription?.status === 'active'

  const algorithmsByCategory = algorithms.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = []
    }
    acc[algorithm.category].push(algorithm)
    return acc
  }, {} as Record<string, typeof algorithms>)

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Algorithm Visualizations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore and understand data structures and algorithms through interactive visualizations.
          </p>
        </div>

        {Object.entries(algorithmsByCategory).map(([category, algorithms]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
              {category.replace('-', ' ')} Algorithms
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.map((algorithm) => {
                const canAccess = !algorithm.premium || hasActiveSubscription
                
                return (
                  <div
                    key={algorithm.id}
                    className={`bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
                      !canAccess ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {algorithm.name}
                        </h3>
                        {algorithm.premium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pro
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {algorithm.description}
                      </p>
                      
                      {canAccess ? (
                        <Link
                          href={`/algorithms/${algorithm.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Visualize
                        </Link>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">
                            Requires Pro subscription
                          </p>
                          <Link
                            href="/pricing?reason=premium_required"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                          >
                            Upgrade to Pro
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}