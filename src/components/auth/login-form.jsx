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
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
});

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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
                            <div className="flex items-center">                           <FieldLabel htmlFor="form-login-password">
                                Password
                            </FieldLabel>
                                <Link
                                    to="/forgot-password"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

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
            </FieldGroup>

            <Button className="w-full mt-3" type="submit" size="lg">
                Sign in
            </Button>

            <p className="text-center">Don't have an account? <Link to="/register" className="cursor-pointer text-primary font-medium hover:text-primary/90 transition-colors duration-300 hover:underline underline-offset-2">register</Link></p>
        </form>
    );
};

export default LoginForm;