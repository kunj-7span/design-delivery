import * as z from "zod";

export const passwordSchema = z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" });

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const verifyOtpSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});