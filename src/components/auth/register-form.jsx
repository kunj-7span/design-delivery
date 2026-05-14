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
import { Mail, Lock, Eye, EyeOff, User, Camera, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { registerSchema } from "@/schema/auth-schema";

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [preview, setPreview] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);

    const form = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only PNG, and  JPG are allowed.");
            return;
        }

        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            toast.error(`File size must be less than 2MB.`);
            return;
        }

        setAvatarFile(file);

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);
    }


    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);


    const handleRemoveAvatar = () => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview("");
        setAvatarFile(null);
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("confirmPassword", data.confirmPassword);

            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            // const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            console.log("data", formData);
            toast.success("Registration successful");

            navigate("/verify-otp", {
                state: {
                    email: data.email,
                },
            });
        } catch (error) {
            // toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <form
            id="form-register"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >

            <div className="relative mx-auto flex">
                <label className="cursor-pointer flex">
                    <Avatar className="h-20 w-20 border-2 border-dashed border-primary">

                        <AvatarImage src={preview} className="p-1" />

                        <AvatarFallback>
                            <Camera size={28} className="text-primary" />
                        </AvatarFallback>

                    </Avatar>
                    <input
                        key={preview ? "has-avatar" : "no-avatar"}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
                {preview && (
                    <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors flex items-center justify-center h-6 w-6"
                        onClick={handleRemoveAvatar}
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
            <FieldGroup>

                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-name">Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-register-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your name"
                                    autoComplete="name"
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
                            <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-register-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter email"
                                    autoComplete="email"
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
                            <FieldLabel htmlFor="form-register-password">
                                Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-register-password"
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
                            <FieldLabel htmlFor="form-register-confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="form-register-confirm-password"
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
                Register
            </Button>

            <p className="text-center">Already have an account? <Link to="/" className="cursor-pointer text-primary font-medium hover:text-primary/90 transition-colors duration-300 hover:underline underline-offset-2">Sign in</Link></p>
        </form>
    );
};

export default RegisterForm;