import AuthLayout from "@/layout/auth-layout";
import ResetPassordForm from "../../components/auth/reset-password-form";


const ResetPasswordPage = () => {
    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your new password.">
            <ResetPassordForm />
        </AuthLayout>
    )
}

export default ResetPasswordPage
