import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/utils'
import SubscriptionBadge from '@/components/SubscriptionBadge'
import ManageBillingButton from '@/components/ManageBillingButton'
import Link from 'next/link'

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Account</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <SubscriptionBadge subscription={user.subscription} />
                    {user.subscription && (
                      <p className="text-sm text-gray-600 mt-2">
                        Current period ends: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {user.subscription && (
                    <ManageBillingButton />
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/algorithms"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Algorithms
                  </Link>
                  {!user.subscription && (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ml-3"
                    >
                      Upgrade to Pro
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}