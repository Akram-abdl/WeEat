import { z } from 'zod';

export const SpoonacularSearchDataSchema = z.object({
  results: z.unknown(),
  offset: z.number(),
  number: z.number(),
  totalResults: z.number(),
});

export const IngredientsAutocompleteResponseData = z.array(z.object({ name: z.string(), image: z.string() }));
