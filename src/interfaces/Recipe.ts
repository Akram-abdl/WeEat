import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional(),
  imageType: z.string().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
