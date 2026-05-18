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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schema/auth-schema";

const ResetPasswordForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });


    const onSubmit = async (data) => {
        try {
            console.log("data", data);
            toast.success("Reset password successful");

        } catch (error) {
            // toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <form
            id="form-reset-password"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >

            <FieldGroup>

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-reset-password-password">
                                Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-reset-password-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Password"
                                    autoComplete="new-password"
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
                            <FieldLabel htmlFor="form-reset-password-confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-reset-password-confirm-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Confirm Password"
                                    autoComplete="new-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                />
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                                <InputGroupAddon
                                    onClick={() => setConfirmPassword((prev) => !prev)}
                                    className="cursor-pointer"
                                    align="inline-end"
                                >
                                    {showConfirmPassword ? (
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

            <Button className="w-full mt-3" type="submit" size="lg" >
                <RotateCcw size={16} /> Reset Password
            </Button>

            <p className="text-center">Back to <Link to="/" className="cursor-pointer text-primary font-medium hover:text-primary/90 transition-colors duration-300 hover:underline underline-offset-2">Login</Link></p>
        </form>
    );
};

export default ResetPasswordForm;