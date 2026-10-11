export interface VinValidationResult {
  isValid: boolean;
  cleanVin: string;
  errorMessage?: string;
  charCount: number;
}

export const SAMPLE_VINS = [
  { vin: 'WAUDFAFH7MA019823', make: 'Audi', model: 'A4 Quattro', year: 2021 },
  { vin: '1HGCR2F83HA120491', make: 'Honda', model: 'Accord EX-L', year: 2017 },
  { vin: '5UXCR6C05M9B77218', make: 'BMW', model: 'X5 xDrive40i', year: 2021 },
  { vin: '1FA6P8CF5H5392014', make: 'Ford', model: 'Mustang GT', year: 2017 },
  { vin: '4T1B11HK5JU782910', make: 'Toyota', model: 'Camry SE', year: 2018 }
];

export function validateVin(rawVin: string): VinValidationResult {
  // Normalize: remove all whitespace and convert to uppercase
  const cleanVin = rawVin.replace(/\s+/g, '').toUpperCase();
  const charCount = cleanVin.length;

  if (charCount === 0) {
    return {
      isValid: false,
      cleanVin: '',
      charCount: 0,
      errorMessage: 'Please enter a 17-character VIN number.'
    };
  }

  // Check for forbidden characters in standard VINs (I, O, Q)
  const forbiddenMatch = cleanVin.match(/[IOQ]/);
  if (forbiddenMatch) {
    return {
      isValid: false,
      cleanVin,
      charCount,
      errorMessage: `VINs never contain the letter "${forbiddenMatch[0]}" to avoid confusion with numbers 1 and 0.`
    };
  }

  // Check for non-alphanumeric characters
  if (!/^[A-Z0-9]*$/.test(cleanVin)) {
    return {
      isValid: false,
      cleanVin,
      charCount,
      errorMessage: 'VIN must only contain letters and numbers.'
    };
  }

  if (charCount < 17) {
    return {
      isValid: false,
      cleanVin,
      charCount,
      errorMessage: `Entered ${charCount} of 17 characters (${17 - charCount} remaining).`
    };
  }

  if (charCount > 17) {
    return {
      isValid: false,
      cleanVin,
      charCount,
      errorMessage: `A standard VIN must be exactly 17 characters (you entered ${charCount}).`
    };
  }

  return {
    isValid: true,
    cleanVin,
    charCount: 17
  };
}
