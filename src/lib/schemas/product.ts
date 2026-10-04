import { z } from "zod";

export const ledTechnologySchema = z.enum(["SMD", "COB", "GOB"]);

export const productSpecsSchema = z.object({
  pixelPitchMm: z.number().positive(),
  technology: ledTechnologySchema,
  brightnessNits: z.number().positive(),
  refreshRateHz: z.number().positive(),
  cabinetSizeMm: z.string().min(1),
  ipRating: z.string().min(1),
  lifespanHours: z.number().positive(),
  viewingAngle: z.string().min(1),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  series: z.string().min(1),
  category: z.enum([
    "fine-pitch",
    "indoor",
    "outdoor",
    "rental",
    "transparent",
  ]),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  specs: productSpecsSchema,
  highlights: z.array(z.string()),
  image: z.string().min(1),
  imageGradient: z.string().min(1),
});

export type ProductInput = z.infer<typeof productSchema>;
