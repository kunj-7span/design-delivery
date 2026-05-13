import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../ui/button";

const VerifyOtpForm = () => {
    return (
        <div className="flex flex-col gap-5">

            <Field>
                <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="otp-verification">
                        Verification code
                    </FieldLabel>
                    <Button variant="outline" size="xs">
                        <RefreshCwIcon />
                        Resend Code
                    </Button>
                </div>
                <InputOTP containerClassName="justify-center" maxLength={6} id="otp-verification" required>
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-11 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-md">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </Field>

            <Field>
                <Button type="submit" className="w-full">
                    Verify
                </Button>
            </Field>


        </div>
    );
}

export default VerifyOtpForm;