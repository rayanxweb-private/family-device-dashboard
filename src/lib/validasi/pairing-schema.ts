import { z } from 'zod';

export const pairingPayloadSchema = z.object({
  token: z.string().uuid({ message: "Invalid cryptographic UUID token format" }),
  endpoint: z.string().url({ message: "Invalid secure registration endpoint" }),
  timestamp: z.number().positive(),
  expiresAt: z.number().positive(),
  signature: z.string().min(64, { message: "Signature must be a valid SHA-256 hash" }),
});

export type PairingPayload = z.infer<typeof pairingPayloadSchema>;
