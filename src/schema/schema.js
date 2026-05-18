import * as z from "zod";

const emailSchema = z
    .string({ message: "Invalid email address" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" });

const nameSchema = z
    .string()
    .trim()
    .min(1, { message: "Name is required" });

const phoneSchema = z
    .string({ message: "Invalid phone" })
    .trim()
    .length(10, { message: "phone number must be exactly 10 digits" })
    .regex(/^\d+$/, {
        message: "Phone number must contain only numbers",
    });

const clientFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
});

const empFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim({ message: "Name is required" })
    .min(1, { message: "Name is required" }),

  email: z
    .string()
    .trim({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export {
    clientFormSchema,
    empFormSchema
}