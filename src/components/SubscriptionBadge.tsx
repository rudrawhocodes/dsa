interface Subscription {
  status: string
  currentPeriodEnd: Date
}

interface SubscriptionBadgeProps {
  subscription: Subscription | null
}

export default function SubscriptionBadge({ subscription }: SubscriptionBadgeProps) {
  if (!subscription) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        Free Plan
      </span>
    )
  }

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      case 'incomplete':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Pro Plan - Active'
      case 'past_due':
        return 'Pro Plan - Payment Due'
      case 'canceled':
        return 'Pro Plan - Canceled'
      case 'incomplete':
        return 'Pro Plan - Incomplete'
      default:
        return `Pro Plan - ${status}`
    }
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(subscription.status)}`}>
      {getStatusText(subscription.status)}
    </span>
  )
}