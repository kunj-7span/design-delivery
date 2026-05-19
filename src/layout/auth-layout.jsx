import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Logo from "../assets/DDLogoFull.png";

function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-full max-w-sm shadow-xl my-4 mx-4" >
                <CardHeader>

                    <img src={Logo} alt="DD" className="h-10 mx-auto mb-2" />
                    {title && <CardTitle className="text-lg text-center font-medium" >{title}</CardTitle>}
                    {subtitle && <CardDescription className="text-center text-xs">{subtitle}</CardDescription>}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthLayout;