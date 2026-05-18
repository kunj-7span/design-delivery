import AuthLayout from "../../layout/auth-layout";
import RegisterForm from "../../components/auth/register-form";

const RegisterPage = () => {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Setup your Design Delivery account">
            <RegisterForm />
        </AuthLayout>
    );
};

export default RegisterPage;