export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  vehicleChecked: string;
  moneySaved: string;
  avatar: string;
  date: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Marcus K.',
    location: 'Austin, TX',
    rating: 5,
    review: 'VinLens caught an undisclosed structural collision repair on a 2019 F-150 that the private seller swore was accident-free. Saved me over $4,500 and a huge future headache.',
    vehicleChecked: '2019 Ford F-150 XLT',
    moneySaved: 'Saved ~$4,500',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 2 weeks ago'
  },
  {
    id: '2',
    name: 'Elena R.',
    location: 'Denver, CO',
    rating: 5,
    review: 'The odometer rollback detection is incredible. The digital dashboard said 54,000 miles, but VinLens showed the car was serviced at 89,000 miles just 8 months ago in another state! Lifesaver.',
    vehicleChecked: '2018 BMW 330i xDrive',
    moneySaved: 'Avoided Fraud',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 3 weeks ago'
  },
  {
    id: '3',
    name: 'David S.',
    location: 'Chicago, IL',
    rating: 5,
    review: 'Super clean interface and generated in literally 3 seconds. The breakdown of previous owners and service history made negotiating the price with the dealer effortless.',
    vehicleChecked: '2021 Toyota RAV4 Hybrid',
    moneySaved: 'Saved $1,200 on price',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 1 month ago'
  },
  {
    id: '4',
    name: 'Samantha M.',
    location: 'Orlando, FL',
    rating: 5,
    review: 'I nearly bought a flooded hurricane vehicle that had been retitled in another state. VinLens flagged the historical water damage brand immediately. Would recommend to anyone buying used.',
    vehicleChecked: '2020 Honda CR-V Touring',
    moneySaved: 'Saved ~$6,000',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 1 month ago'
  },
  {
    id: '5',
    name: 'Brandon T.',
    location: 'Nashville, TN',
    rating: 5,
    review: 'Ran a check right on the dealer lot before signing. The report immediately flagged an unresolved insurance lien and structural frame notification from an out-of-state auction. Saved me from buying a financial nightmare.',
    vehicleChecked: '2017 Chevrolet Silverado 1500',
    moneySaved: 'Saved ~$2,800',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 1 month ago'
  },
  {
    id: '6',
    name: 'Chloe W.',
    location: 'Seattle, WA',
    rating: 5,
    review: 'Detailed battery warranty records, single original owner verification, and complete software service history gave me total confidence in this EV purchase. The PDF export feature was great for my bank.',
    vehicleChecked: '2022 Tesla Model 3 Long Range',
    moneySaved: 'Negotiated $1,500 Off',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    date: 'Verified Buyer · 2 months ago'
  }
];
