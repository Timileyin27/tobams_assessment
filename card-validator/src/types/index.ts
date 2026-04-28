export interface ValidationRequest {
    cardNumber: string;
  }
  
  export interface ValidationResponse {
    valid: boolean;
    cardNumber: string;
    message: string;
  }
  
  export interface ErrorResponse {
    error: string;
    message: string;
  }
  
  export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';