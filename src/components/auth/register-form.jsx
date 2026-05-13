import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),

    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),

    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
})

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <form
            id="form-login"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FieldGroup>

                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-name">Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-login-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your name"
                                    autoComplete="off"
                                    type="text"
                                />
                                <InputGroupAddon>
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-login-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    type="email"
                                />
                                <InputGroupAddon>
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-password">
                                Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-login-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                                <InputGroupAddon
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="cursor-pointer"
                                    align="inline-end"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-login-confirm-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Confirm Password"
                                    autoComplete="off"
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                                <InputGroupAddon
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="cursor-pointer"
                                    align="inline-end"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button className="w-full mt-3" type="submit" size="lg">
                Sign in
            </Button>

        </form>
    );
};

export default RegisterForm;