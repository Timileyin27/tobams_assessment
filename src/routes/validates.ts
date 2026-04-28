import { Router, Request, Response } from 'express';
import { 
  validateLuhn, 
  sanitizeCardNumber, 
  containsOnlyValidCharacters,
  detectCardNetwork 
} from '../services/card_service';
import { ValidationRequest, ValidationResponse } from '../types';

const router = Router();

router.post('/', (req: Request, res: Response): void => {
  const { cardNumber } = req.body as ValidationRequest;

  // Check field presence
  if (cardNumber === undefined || cardNumber === null) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'cardNumber is required in request body',
    });
    return;
  }

  // Check type
  if (typeof cardNumber !== 'string') {
    res.status(400).json({
      error: 'Bad Request',
      message: 'cardNumber must be a string',
    });
    return;
  }

  // Check empty/whitespace
  if (cardNumber.trim().length === 0) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'cardNumber cannot be empty',
    });
    return;
  }

  // Check valid characters
  if (!containsOnlyValidCharacters(cardNumber)) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'cardNumber can only contain digits, spaces, and hyphens',
    });
    return;
  }

  const sanitized = sanitizeCardNumber(cardNumber);
  const isValid = validateLuhn(sanitized);
  const network = detectCardNetwork(sanitized);

  const response: ValidationResponse = {
    valid: isValid,
    cardNumber: sanitized,
    message: isValid 
      ? `Valid ${network !== 'unknown' ? network.toUpperCase() : ''} card number`
      : 'Invalid card number - failed Luhn check',
  };

  res.status(200).json(response);
});

export default router;