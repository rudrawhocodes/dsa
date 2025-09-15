export async function startCheckout(priceId: string) {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const { url } = await response.json()
    
    if (url) {
      window.location.href = url
    } else {
      throw new Error('Failed to create checkout session')
    }
  } catch (error) {
    console.error('Error starting checkout:', error)
    throw error
  }
}