export const pricingCards = [
    {
      title: 'Standard',
      description: 'Perfect for trying out features',
      price: '$0',
      duration: '',
      highlight: 'Key features',
      features: [' 1 domain ', '10 products', '10 image credits per month'],
      priceId: '',
    },
    {
      title: 'Pro',
      description: 'For serious business owners',
      price: '$35',
      duration: 'month',
      highlight: 'Everything in Starter, plus',
      features: [' 2 domain ', '50 products', '50 credits per month'],
      priceId: `${process.env.PRICE_ID_1}`,
    },
    {
      title: 'Ultimate',
      description: 'The ultimate multi-promotional toolkit',
      price: '$85',
      duration: 'month',
      highlight: 'Key features',
      features: [' Unlimited domains ', '200 products', '200 credits per month'],
  
      priceId: `${process.env.PRICE_ID_2}`,
    },
    
  ]
  