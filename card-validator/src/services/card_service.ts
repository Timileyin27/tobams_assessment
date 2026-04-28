import { CardNetwork } from '../types';


export function detectCardNetwork(cardNumber: string): CardNetwork {
  const clean = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^6(?:011|5)/.test(clean)) return 'discover';
  
  return 'unknown';
}


export function validateLuhn(cardNumber: string): boolean {
  // Remove all non-digit characters
  const clean = cardNumber.replace(/\D/g, '');
  
  // Length validation: cards are 13-19 digits
  if (clean.length < 13 || clean.length > 19) {
    return false;
  }

  let sum = 0;
  let isEvenPosition = false;

  // Iterate from right to left
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);

    if (isEvenPosition) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEvenPosition = !isEvenPosition;
  }

  return sum % 10 === 0;
}

export function sanitizeCardNumber(input: string): string {
  return input.replace(/[\s-]/g, '');
}

export function containsOnlyValidCharacters(input: string): boolean {
  return /^[\d\s-]+$/.test(input);
}