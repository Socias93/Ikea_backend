import z from "zod";

const employeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .email({ error: "Wrong email format" })
    .min(1, { message: "Email is required" }),
  phone: z
    .string({ error: "Phonenumber is required" })
    .min(1, { message: "Phonenumber is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

type employeFormData = z.infer<typeof employeSchema>;

export function validate(body: employeFormData) {
  return employeSchema.safeParse(body);
}
