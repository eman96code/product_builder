import { z } from "zod";

export const ProductFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(50, {
      message: "Title must not exceed 50 characters.",
    }),
  imgURL: z.string().url(),
  price: z.coerce.number().gt(5),
  description: z
    .string()
    .min(20, {
      message: "description must be at least 20 characters.",
    })
    .max(500, {
      message: "description must not exceed 500 characters.",
    }),

  category: z.string(),
});
