import { z } from "zod";

export const quoteStep1Schema = z.object({
  company: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid work email required"),
  phone: z.string().min(7, "Phone is required"),
  country: z.string().min(2, "Country is required"),
});

export const quoteStep2Schema = z.object({
  projectType: z.enum([
    "control-room",
    "retail",
    "broadcast",
    "stadium",
    "corporate",
    "other",
  ]),
  environment: z.enum(["indoor", "outdoor", "mixed"]),
  widthM: z.coerce.number().min(0.5).max(100),
  heightM: z.coerce.number().min(0.5).max(50),
  pitchPreference: z.string().optional(),
});

export const quoteStep3Schema = z.object({
  timeline: z.enum(["asap", "1-3m", "3-6m", "6m+"]),
  budgetBand: z.enum(["under-50k", "50-150k", "150-500k", "500k+", "tbd"]),
  notes: z.string().max(2000).optional(),
});

export const quoteFormSchema = quoteStep1Schema
  .merge(quoteStep2Schema)
  .merge(quoteStep3Schema);

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
