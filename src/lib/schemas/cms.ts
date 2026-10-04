import { z } from "zod";

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqPageSchema = z.object({
  items: z.array(faqItemSchema).min(1),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
