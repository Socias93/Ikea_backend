import z from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  categoryId: z
    .string({ error: "You must choose a category" })
    .min(1, { message: "Category is required" }),
  numberInStock: z
    .number({ error: "You must write a number" })
    .min(1, { message: "Stock cant be less than 1" })
    .max(100, { message: "Stock cant be more than 100" }),
  price: z
    .number({ error: "You must write a number" })
    .min(1, { message: "Price cant be less than 1" })
    .max(100, { message: "Price cant be more than 100" }),
});

export type itemFormData = z.infer<typeof itemSchema>;

export function validate(body: itemFormData) {
  return itemSchema.safeParse(body);
}
