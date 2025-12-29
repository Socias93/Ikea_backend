import z from "zod";

const employeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  age: z
    .number({ error: "You must write with numbers" })
    .min(18, { message: "Age cant be less than 18" }),
  email: z
    .email({ error: "Wrong email format" })
    .min(1, { message: "Email is required" }),
  phone: z
    .number({ error: "You must write with numbers" })
    .min(1, { message: "Phonenumber is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

type employeFormData = z.infer<typeof employeSchema>;

export function validate(body: employeFormData) {
  return employeSchema.safeParse(body);
}
