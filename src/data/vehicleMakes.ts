export interface VehicleMake {
  name: string;
  country: string;
  sampleVin: string;
  popularModels: string[];
}

export const SUPPORTED_MAKES: VehicleMake[] = [
  { name: 'Toyota', country: 'Japan', sampleVin: '4T1B11HK5JU782910', popularModels: ['Camry', 'RAV4', 'Corolla', 'Tacoma'] },
  { name: 'Honda', country: 'Japan', sampleVin: '1HGCR2F83HA120491', popularModels: ['Civic', 'Accord', 'CR-V', 'Pilot'] },
  { name: 'Ford', country: 'USA', sampleVin: '1FA6P8CF5H5392014', popularModels: ['F-150', 'Mustang', 'Explorer', 'Escape'] },
  { name: 'BMW', country: 'Germany', sampleVin: '5UXCR6C05M9B77218', popularModels: ['3 Series', '5 Series', 'X3', 'X5'] },
  { name: 'Mercedes-Benz', country: 'Germany', sampleVin: 'WDD2050421F384910', popularModels: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  { name: 'Audi', country: 'Germany', sampleVin: 'WAUDFAFH7MA019823', popularModels: ['A4', 'A6', 'Q5', 'Q7'] },
  { name: 'Volkswagen', country: 'Germany', sampleVin: '3VWD17AJ4HM129845', popularModels: ['Jetta', 'Golf', 'Tiguan', 'Atlas'] },
  { name: 'Hyundai', country: 'South Korea', sampleVin: '5NMS23AE5LH918234', popularModels: ['Tucson', 'Elantra', 'Santa Fe', 'Sonata'] },
  { name: 'Kia', country: 'South Korea', sampleVin: '5XYPG4A37MG381920', popularModels: ['Sportage', 'Telluride', 'Forte', 'Sorento'] },
  { name: 'Nissan', country: 'Japan', sampleVin: '1N4BL4BV9KC291048', popularModels: ['Rogue', 'Altima', 'Sentra', 'Pathfinder'] },
  { name: 'Mazda', country: 'Japan', sampleVin: 'JM3KFBCM9L0829104', popularModels: ['CX-5', 'Mazda3', 'CX-30', 'CX-90'] },
  { name: 'Subaru', country: 'Japan', sampleVin: '4S4WAAFC6M3289104', popularModels: ['Outback', 'Forester', 'Crosstrek', 'Impreza'] },
  { name: 'Lexus', country: 'Japan', sampleVin: '2T2BZMCA4KC892014', popularModels: ['RX 350', 'ES 350', 'NX 300', 'GX 460'] },
  { name: 'Chevrolet', country: 'USA', sampleVin: '1G1ZE5ST3KF182930', popularModels: ['Silverado', 'Equinox', 'Malibu', 'Tahoe'] },
  { name: 'Tesla', country: 'USA', sampleVin: '5YJ3E1EB9MF892104', popularModels: ['Model 3', 'Model Y', 'Model S', 'Model X'] },
  { name: 'Volvo', country: 'Sweden', sampleVin: 'YV4A22PK9K1829401', popularModels: ['XC90', 'XC60', 'S60', 'V60'] },
  { name: 'Porsche', country: 'Germany', sampleVin: 'WP0AA2A95LS192840', popularModels: ['911', 'Cayenne', 'Macan', 'Panamera'] },
  { name: 'Jeep', country: 'USA', sampleVin: '1C4HJXDG9MW281940', popularModels: ['Wrangler', 'Grand Cherokee', 'Gladiator', 'Compass'] },
  { name: 'Dodge', country: 'USA', sampleVin: '2C3CDXBG7LH192840', popularModels: ['Charger', 'Challenger', 'Durango'] },
  { name: 'GMC', country: 'USA', sampleVin: '1GTU9EET5LZ281940', popularModels: ['Sierra 1500', 'Yukon', 'Acadia', 'Canyon'] },
  { name: 'Ram', country: 'USA', sampleVin: '1C6SRFHT8LN291048', popularModels: ['1500', '2500', '3500'] },
  { name: 'Land Rover', country: 'UK', sampleVin: 'SALWR2V44KA192840', popularModels: ['Defender', 'Range Rover Sport', 'Evoque'] },
  { name: 'Acura', country: 'Japan', sampleVin: '19UUB5F35LA192840', popularModels: ['MDX', 'RDX', 'TLX', 'Integra'] },
  { name: 'Infiniti', country: 'Japan', sampleVin: 'JN1CV7AP3KM192840', popularModels: ['Q50', 'QX60', 'QX50', 'QX80'] },
  { name: 'Cadillac', country: 'USA', sampleVin: '1G6DV5S84K0192840', popularModels: ['Escalade', 'CT5', 'XT5', 'XT4'] },
  { name: 'Lincoln', country: 'USA', sampleVin: '5LMCJ2D91LUL92840', popularModels: ['Navigator', 'Aviator', 'Corsair'] },
  { name: 'Buick', country: 'USA', sampleVin: 'KL4CJ1SB8KB192840', popularModels: ['Encore GX', 'Enclave', 'Envision'] },
  { name: 'Chrysler', country: 'USA', sampleVin: '2C4RC1CG5LR192840', popularModels: ['Pacifica', '300'] },
  { name: 'Genesis', country: 'South Korea', sampleVin: 'KMHL14JA3MU192840', popularModels: ['G70', 'G80', 'GV70', 'GV80'] },
  { name: 'Jaguar', country: 'UK', sampleVin: 'SAJWA4FP6KA192840', popularModels: ['F-Pace', 'E-Pace', 'XF'] },
  { name: 'Mini', country: 'UK', sampleVin: 'WMWXR3C58K2B92840', popularModels: ['Cooper Hardtop', 'Countryman', 'Clubman'] },
  { name: 'Mitsubishi', country: 'Japan', sampleVin: 'JA4AZ3A35LZ192840', popularModels: ['Outlander', 'Eclipse Cross', 'Mirage'] }
];
