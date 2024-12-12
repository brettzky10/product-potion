//Clients
import client1 from '../../../public/images/site/client1.png';
import client2 from '../../../public/images/site/client2.png';
import client3 from '../../../public/images/site/client3.png';
import client4 from '../../../public/images/site/client4.png';
import client5 from '../../../public/images/site/client5.png';

export const CLIENTS = [
  { alt: 'client1', logo: client1 },
  { alt: 'client2', logo: client2 },
  { alt: 'client3', logo: client3 },
  { alt: 'client4', logo: client4 },
  { alt: 'client5', logo: client5 },
];


  //Pricing
  export const pricingCards = [
    {
      title: 'Starter',
      description: 'Perfect for trying out 1Man',
      price: 'Free',
      duration: '',
      highlight: 'Key features',
      features: ['3 Sub accounts', '2 Team members', 'Unlimited pipelines'],
      priceId: '',
    },
    
    {
      title: 'Basic',
      description: 'For serious agency owners',
      price: '$49',
      duration: 'month',
      highlight: 'Everything in Starter, plus',
      features: ['Unlimited Sub accounts', 'Unlimited Team members'],
      priceId: 'price_1OrmE3DKaSYhwFbe6PHoXBQm',
    },
    {
      title: 'Unlimited Business Plan',
      description: 'The ultimate agency kit',
      price: '$199',
      duration: 'month',
      highlight: 'Key features',
      features: ['Rebilling', '24/7 Support team'],
      priceId: 'price_1OrmE3DKaSYhwFbeMSf3YDcw',
    },
  ]