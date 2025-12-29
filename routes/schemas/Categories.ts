import z from "zod";

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function validate(body: CategoryFormData) {
  return categorySchema.safeParse(body);
}
