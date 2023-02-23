import { z } from 'zod';

export const IngredientAutoCompleteSchema = z.object({
  name: z.string(),
  image: z.string(),
});

export type IngredientAutoComplete = z.infer<typeof IngredientAutoCompleteSchema>;
