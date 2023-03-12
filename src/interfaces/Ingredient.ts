import { z } from 'zod';

export const IngredientSchema = z.object({
  id: z.number(),
  aisle: z.string().nullable(),
  image: z.string(),
  consistency: z.string(),
  name: z.string(),
  nameClean: z.string(),
  original: z.string(),
  originalName: z.string(),
  amount: z.number(),
  unit: z.string(),
  meta: z.string().array(),
  measures: z.object({
    us: z.object({
      amount: z.number(),
      unitShort: z.string(),
      unitLong: z.string(),
    }),
    metric: z.object({
      amount: z.number(),
      unitShort: z.string(),
      unitLong: z.string(),
    }),
  }),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
