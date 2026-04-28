import request from 'supertest';
import { createApp } from '../src/app';

describe('POST /api/validate', () => {
  const app = createApp();

  describe('Valid card numbers', () => {
    it('should validate a known valid Visa card', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532015112830366' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
      expect(response.body.cardNumber).toBe('4532015112830366');
      expect(response.body.message).toContain('Valid');
    });

    it('should validate card with spaces', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532 0151 1283 0366' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
      expect(response.body.cardNumber).toBe('4532015112830366');
    });

    it('should validate card with dashes', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532-0151-1283-0366' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
    });

    it('should validate Mastercard', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '5555555555554444' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
      expect(response.body.message).toContain('MASTERCARD');
    });

    it('should validate American Express', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '378282246310005' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
      expect(response.body.message).toContain('AMEX');
    });
  });

  describe('Invalid card numbers', () => {
    it('should reject a card with invalid Luhn checksum', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532015112830367' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });

    it('should reject a card that is too short', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '123456789012' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(false);
    });

    it('should reject a card that is too long', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '12345678901234567890' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(false);
    });
  });

  describe('Bad input handling', () => {
    it('should return 400 when cardNumber is missing', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toContain('required');
    });

    it('should return 400 when cardNumber is null', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: null });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should return 400 when cardNumber is not a string', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: 4532015112830366 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('must be a string');
    });

    it('should return 400 for empty string', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('cannot be empty');
    });

    it('should return 400 for whitespace-only string', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('cannot be empty');
    });

    it('should return 400 for invalid characters', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532-0151-1283-03AB' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('digits, spaces, and hyphens');
    });
  });

  describe('Edge cases', () => {
    it('should handle mixed format', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({ cardNumber: '4532 0151-1283 0366' });

      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
      expect(response.body.cardNumber).toBe('4532015112830366');
    });
  });
});