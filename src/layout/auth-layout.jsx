import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Logo from "../assets/DDLogoFull.png";

function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader>

                    <img src={Logo} alt="DD" className="h-12 mx-auto mb-2" />
                    {title && <CardTitle className="text-2xl text-center">{title}</CardTitle>}
                    {subtitle && <CardDescription className="text-center">{subtitle}</CardDescription>}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthLayout;