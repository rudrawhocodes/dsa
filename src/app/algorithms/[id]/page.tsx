import { notFound, redirect } from 'next/navigation'
import { getAlgorithm } from '@/lib/algorithms'
import { getCurrentUser } from '@/lib/auth/utils'
import AlgorithmPlayer from '@/components/AlgorithmPlayer'

interface AlgorithmPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { id } = await params
  const algorithm = getAlgorithm(id)
  
  if (!algorithm) {
    notFound()
  }

  const user = await getCurrentUser()
  const hasActiveSubscription = user?.subscription?.status === 'active'

  // Check if user can access this algorithm
  if (algorithm.premium && !hasActiveSubscription) {
    redirect('/pricing?reason=premium_required')
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {algorithm.name}
              </h1>
              <p className="text-gray-600">{algorithm.description}</p>
            </div>
            {algorithm.premium && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Premium Algorithm
              </span>
            )}
          </div>
        </div>

        <AlgorithmPlayer algorithm={algorithm} />
      </div>
    </div>
  )
}