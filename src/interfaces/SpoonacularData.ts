import { z } from 'zod';

export const SpoonacularDataSchema = z.object({
  results: z.unknown(),
  offset: z.number(),
  number: z.number(),
  totalResults: z.number(),
});

export type SpoonacularData = z.infer<typeof SpoonacularDataSchema>;
