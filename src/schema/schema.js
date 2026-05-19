import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

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
    .refine((val) => isValidPhoneNumber(val, "IN"), {
        message: "Invalid phone number",
    });

const clientFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
});

const taskFormSchema = z.object({
    name: nameSchema,
    employeeName: z.string().min(1, { message: "Employee selection is required" }),
    description: z.string().max(300, { message: "Description cannot exceed 300 characters" }).optional().default(null)
});

const empFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
});

const projectSchema = z.object({
    name: nameSchema,
    client: nameSchema,
});

export {
    clientFormSchema,
    empFormSchema,
    projectSchema
    taskFormSchema,
}