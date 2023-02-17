import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  imageType: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
