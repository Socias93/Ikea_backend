import z from "zod";

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
});

type eategoryFormData = z.infer<typeof categorySchema>;

export function validate(body: eategoryFormData) {
  return categorySchema.safeParse(body);
}
