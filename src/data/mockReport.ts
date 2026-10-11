export interface VehicleReportData {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyStyle: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  assemblyCountry: string;
  overallScore: number; // e.g. 94/100
  ownersCount: number;
  lastReportedMileage: number;
  accidentsReported: number;
  structuralDamage: boolean;
  airbagDeployment: boolean;
  salvageOrJunkTitle: boolean;
  floodDamage: boolean;
  theftRecord: boolean;
  openRecalls: number;
  serviceRecordsCount: number;
  usageType: 'Personal Vehicle' | 'Commercial' | 'Rental' | 'Lease';
  titleStatus: 'Clean' | 'Salvage' | 'Rebuilt' | 'Lien Active';
  stateOfTitle: string;
  inspectionHistory: {
    date: string;
    type: string;
    odometer: number;
    source: string;
    details: string;
  }[];
  accidentDetails?: {
    date: string;
    severity: 'Minor' | 'Moderate' | 'Severe';
    impactPoint: string;
    airbagsDeployed: boolean;
    repairCostEstimate: string;
    reportedBy: string;
  }[];
  ownersTimeline: {
    ownerNumber: number;
    yearPurchased: number;
    ownershipLength: string;
    estimatedMilesPerYear: number;
    state: string;
    usage: string;
  }[];
  mileageHistory: {
    date: string;
    mileage: number;
    source: string;
    anomalyDetected: boolean;
  }[];
}

export const DEFAULT_MOCK_REPORT: VehicleReportData = {
  vin: 'WAUDFAFH7MA019823',
  year: 2021,
  make: 'Audi',
  model: 'A4',
  trim: '2.0T Quattro Premium Plus',
  bodyStyle: '4-Door Luxury Sedan',
  engine: '2.0L Turbocharged I4 DOHC 16V (261 HP)',
  transmission: '7-Speed S Tronic Dual-Clutch Automatic',
  drivetrain: 'All-Wheel Drive (Quattro)',
  fuelType: 'Premium Unleaded',
  exteriorColor: 'Ibis White',
  interiorColor: 'Black Leather',
  assemblyCountry: 'Germany (Ingolstadt)',
  overallScore: 94,
  ownersCount: 1,
  lastReportedMileage: 42150,
  accidentsReported: 0,
  structuralDamage: false,
  airbagDeployment: false,
  salvageOrJunkTitle: false,
  floodDamage: false,
  theftRecord: false,
  openRecalls: 0,
  serviceRecordsCount: 8,
  usageType: 'Personal Vehicle',
  titleStatus: 'Clean',
  stateOfTitle: 'California',
  inspectionHistory: [
    {
      date: 'Aug 14, 2024',
      type: 'Routine Scheduled Maintenance',
      odometer: 42150,
      source: 'Authorized Audi Service Center',
      details: '40k minor service completed. Oil & filter replaced, brake inspection passed, multi-point digital inspection clean.'
    },
    {
      date: 'Jan 22, 2024',
      type: 'Tire & Brake Service',
      odometer: 36400,
      source: 'Continental Tire Specialist',
      details: 'Four Michelin Pilot Sport tires balanced & mounted. Four-wheel precision alignment performed.'
    },
    {
      date: 'Jul 10, 2023',
      type: 'Annual State Safety Inspection',
      odometer: 28900,
      source: 'California Bureau of Automotive Repair',
      details: 'Passed emissions smog test & brake safety check without warnings.'
    },
    {
      date: 'Nov 05, 2022',
      type: 'Factory Scheduled Service',
      odometer: 19800,
      source: 'Audi Certified Dealership',
      details: '20,000-mile service inspection. Cabin air filter replaced, brake fluid flushed.'
    },
    {
      date: 'May 18, 2021',
      type: 'First Retail Sale & Registration',
      odometer: 25,
      source: 'Audi Downtown Los Angeles',
      details: 'Vehicle purchased new by private first owner. Registered and titled in CA.'
    }
  ],
  accidentDetails: [],
  ownersTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2021,
      ownershipLength: '3 Years, 4 Months',
      estimatedMilesPerYear: 12645,
      state: 'California',
      usage: 'Personal / Commuter'
    }
  ],
  mileageHistory: [
    { date: 'May 2021', mileage: 25, source: 'Audi Dealer Pre-Delivery', anomalyDetected: false },
    { date: 'Nov 2021', mileage: 7850, source: '10k Service Inspection', anomalyDetected: false },
    { date: 'Nov 2022', mileage: 19800, source: 'Dealer Scheduled Service', anomalyDetected: false },
    { date: 'Jul 2023', mileage: 28900, source: 'State Smog Verification', anomalyDetected: false },
    { date: 'Jan 2024', mileage: 36400, source: 'Tire Center Service', anomalyDetected: false },
    { date: 'Aug 2024', mileage: 42150, source: 'Authorized Service Center', anomalyDetected: false }
  ]
};

export const ACCIDENT_MOCK_REPORT: VehicleReportData = {
  vin: '1HGCR2F83HA120491',
  year: 2017,
  make: 'Honda',
  model: 'Accord',
  trim: 'EX-L V6 Navigation',
  bodyStyle: '4-Door Sedan',
  engine: '3.5L V6 SOHC 24V i-VTEC (278 HP)',
  transmission: '6-Speed Automatic',
  drivetrain: 'Front-Wheel Drive',
  fuelType: 'Regular Unleaded',
  exteriorColor: 'Modern Steel Metallic',
  interiorColor: 'Gray Leather',
  assemblyCountry: 'United States (Marysville, OH)',
  overallScore: 71,
  ownersCount: 2,
  lastReportedMileage: 89420,
  accidentsReported: 1,
  structuralDamage: false,
  airbagDeployment: false,
  salvageOrJunkTitle: false,
  floodDamage: false,
  theftRecord: false,
  openRecalls: 1,
  serviceRecordsCount: 14,
  usageType: 'Personal Vehicle',
  titleStatus: 'Clean',
  stateOfTitle: 'Texas',
  inspectionHistory: [
    {
      date: 'Sep 02, 2024',
      type: 'Odometer Reading & Inspection',
      odometer: 89420,
      source: 'Texas Dept of Public Safety',
      details: 'Annual vehicle inspection passed. Open recall notice noted for fuel pump impeller.'
    },
    {
      date: 'Mar 15, 2022',
      type: 'Accident Damage Repair',
      odometer: 54100,
      source: 'Certified Collision Center',
      details: 'Repaired right front bumper cover and replacement headlamp assembly. No frame rail damage.'
    }
  ],
  accidentDetails: [
    {
      date: 'Feb 28, 2022',
      severity: 'Minor',
      impactPoint: 'Front Right Fender & Bumper',
      airbagsDeployed: false,
      repairCostEstimate: '$1,850 - $2,400',
      reportedBy: 'Texas Dept of Transportation / Police Incident'
    }
  ],
  ownersTimeline: [
    {
      ownerNumber: 1,
      yearPurchased: 2017,
      ownershipLength: '4 Years, 2 Months',
      estimatedMilesPerYear: 11500,
      state: 'Texas',
      usage: 'Personal'
    },
    {
      ownerNumber: 2,
      yearPurchased: 2021,
      ownershipLength: '3 Years, 5 Months',
      estimatedMilesPerYear: 12200,
      state: 'Texas',
      usage: 'Personal'
    }
  ],
  mileageHistory: [
    { date: 'Apr 2017', mileage: 15, source: 'Dealer Delivery', anomalyDetected: false },
    { date: 'Oct 2018', mileage: 14200, source: 'Oil Change Center', anomalyDetected: false },
    { date: 'Nov 2019', mileage: 28400, source: 'Annual Inspection', anomalyDetected: false },
    { date: 'Jun 2021', mileage: 48100, source: 'Transfer of Title', anomalyDetected: false },
    { date: 'Feb 2022', mileage: 54050, source: 'Accident Record', anomalyDetected: false },
    { date: 'Sep 2024', mileage: 89420, source: 'State Inspection', anomalyDetected: false }
  ]
};

export function getMockReportByVin(vin: string): VehicleReportData {
  if (vin.toUpperCase().includes('1HGCR') || vin.toUpperCase().includes('ACCIDENT') || vin.toUpperCase().includes('ABC-1234')) {
    return { ...ACCIDENT_MOCK_REPORT, vin };
  }
  const base = { ...DEFAULT_MOCK_REPORT, vin: vin || DEFAULT_MOCK_REPORT.vin };
  if (vin.startsWith('PLATE:')) {
    const match = vin.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      base.stateOfTitle = match[1];
    }
  }
  return base;
}
