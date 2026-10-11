export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is a VIN (Vehicle Identification Number)?',
    answer: 'A VIN is a unique 17-character alphanumeric code assigned to every motor vehicle when manufactured. Often called a car\'s digital fingerprint or DNA, it specifies the vehicle\'s country of origin, manufacturer, make, model year, engine specifications, assembly plant, and production sequence without repeating across any vehicle built in the last 30+ years.'
  },
  {
    id: 'faq-2',
    question: 'How can I check a vehicle\'s history?',
    answer: 'You can check vehicle history instantly by entering the 17-character VIN into VinLens. VinLens scans nationwide government databases (including NMVTIS), insurance claims records, state DMVs, law enforcement stolen vehicle registries, auction salvage listings, and certified repair shops to compile a comprehensive historical dossier in seconds.'
  },
  {
    id: 'faq-3',
    question: 'Can I check a VIN before buying a used car?',
    answer: 'Yes, in fact, checking the VIN before test-driving or making an offer is strongly recommended. Reputable private sellers and dealerships will readily provide the VIN upon request. It allows you to confirm that the seller is the legal owner, identify hidden past accidents or frame damage, check for active liens or unpaid loans, and verify the true odometer reading.'
  },
  {
    id: 'faq-4',
    question: 'What information can a VIN report contain?',
    answer: 'A comprehensive VinLens report includes: accident and collision history, airbag deployment records, title brands (such as Salvage, Junk, Rebuilt, Flood, Lemon, or Fire), number of previous owners and registration history, odometer rollback analysis, open safety recalls, manufacturer specifications, lien and loan records, commercial or rental fleet usage, and recorded maintenance history.'
  },
  {
    id: 'faq-5',
    question: 'Is a VIN the same as a license plate?',
    answer: 'No. A license plate is issued by a specific state or province and changes whenever the vehicle is registered by a new owner or moved to another state. A VIN, on the other hand, is stamped permanently into the vehicle\'s chassis and dashboard during manufacturing and never changes throughout the lifetime of the vehicle.'
  },
  {
    id: 'faq-6',
    question: 'Does a VIN check guarantee a vehicle is accident-free?',
    answer: 'A VIN check reports all events documented by official sources, insurance underwriters, police departments, auctions, and reporting service facilities. While it captures the vast majority of significant vehicle events, minor repairs paid completely in cash without police or insurance involvement may not appear on official records. For this reason, we always recommend pairing a VinLens report with a hands-on pre-purchase mechanical inspection.'
  }
];
