'use client'

import { startCheckout } from '@/lib/stripe/client'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

interface PricingPlanCardProps {
  title: string
  price: string
  period: string
  features: string[]
  priceId: string
  popular?: boolean
}

function PricingPlanCard({ title, price, period, features, priceId, popular }: PricingPlanCardProps) {
  const { data: session } = useSession()

  const handleSubscribe = async () => {
    if (!session) {
      window.location.href = '/api/auth/signin'
      return
    }

    try {
      await startCheckout(priceId)
    } catch (error) {
      console.error('Failed to start checkout:', error)
      alert('Failed to start checkout. Please try again.')
    }
  }

  return (
    <div className={`relative rounded-2xl p-8 ${popular ? 'ring-2 ring-blue-600 bg-blue-50' : 'bg-white border'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-2">/{period}</span>
        </div>
        
        <ul className="space-y-3 mb-8 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={handleSubscribe}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            popular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          {session ? 'Subscribe Now' : 'Sign In to Subscribe'}
        </button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock advanced algorithms and premium features with our Pro subscription.
          </p>
          
          {reason === 'premium_required' && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-800">
                This algorithm requires a Pro subscription to access.
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingPlanCard
            title="Free"
            price="$0"
            period="forever"
            features={[
              'Basic sorting algorithms',
              'Binary search visualization',
              'Limited code samples',
              'Community support'
            ]}
            priceId=""
          />
          
          <PricingPlanCard
            title="Pro"
            price="$9"
            period="month"
            features={[
              'All free features',
              'Advanced tree algorithms (AVL, Red-Black)',
              'Graph algorithms',
              'Complete code samples in multiple languages',
              'Priority support',
              'Export visualizations'
            ]}
            priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTH || 'price_placeholder_month'}
            popular
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}