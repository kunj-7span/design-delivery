import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { verifyOtpSchema } from "@/schema/auth-schema";
import { authServices } from "@/services/auth-services";
import { toast } from "sonner";


const VerifyOtpForm = () => {

    const [secoundsLeft, setSecoundsLeft] = useState(0);

    const form = useForm({
        mode: "onchange",
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: ""
        }
    });

    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state);

    const startResendTimer = () => {
        const expiryTime = Date.now() + 30000;

        localStorage.setItem(
            "otp_resend_expiry",
            expiryTime
        );

        setSecoundsLeft(30);
    };

    useEffect(() => {

        if (!location.state?.email) {
            navigate("/");
            return;
        }

        const checkTimer = () => {
            const currentExpiry = localStorage.getItem("otp_resend_expiry");

            if (!currentExpiry) return;

            const remaining = Math.floor((Number(currentExpiry) - Date.now()) / 1000);

            if (remaining <= 0) {
                setSecoundsLeft(0);
                localStorage.removeItem("otp_resend_expiry");
            } else {
                setSecoundsLeft(remaining);
            }
        };

        checkTimer();
        const interval = setInterval(checkTimer, 1000);

        return () => clearInterval(interval);
    }, [location.state, navigate]);


    const onSubmit = async (data) => {
        const payload = {
            email: location.state?.email,
            otp: data.otp
        }
        console.log(payload);
        try {
            const res = await authServices.verifyOtp(payload);
            console.log("verify otp : ", res);
            toast.success("OTP Verified Successfully");
            localStorage.removeItem("otp_resend_expiry");
            navigate("/agency");
        } catch (error) {
            const errorMessage = error.message || "Verification failed";
            toast.error(errorMessage);
            console.log("verify otp error : ", errorMessage);
        }
    }

    const handleResendOtp = async () => {
        try {
            await authServices.resendOtp({ email: location.state?.email });
            toast.success("OTP Resend Successfully");
            startResendTimer();
        } catch (error) {
            const errorMessage = error.message || "Resend OTP failed";
            toast.error(errorMessage);
            console.log("resend otp error : ", errorMessage);
        }
    };

    return (
        <form
            id="form-login"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-5">

                <Controller
                    name="otp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="otp-verification">
                                    Verification code
                                </FieldLabel>
                                <Button variant="outline" size="xs" type="button" disabled={secoundsLeft > 0} onClick={handleResendOtp}>
                                    <RefreshCwIcon />
                                    {secoundsLeft > 0 ? `resend in ${secoundsLeft}` : "resend code"}
                                </Button>
                            </div>

                            <InputOTP   {...field} maxLength={6} id="otp-verification" inputMode="numeric" pattern={/^[0-9]+$/} autoFocus>
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-11 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-md">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                            {fieldState.invalid && (

                                <div className="min-h-5">
                                    <FieldError errors={[fieldState.error]} />
                                </div>
                            )}

                        </Field>
                    )}
                />

                <Field>
                    <Button type="submit" className="w-full">
                        Verify
                    </Button>
                </Field>
            </div>
        </form>
    );
}

export default VerifyOtpForm
