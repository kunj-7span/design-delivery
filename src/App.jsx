import AgencyDashboard from "./pages/agency/agency-dashboard";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import ForgotPasswordPage from "./pages/auth/forgot-password-page";
import VerifyOtpPage from "./pages/auth/verify-otp-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import ClientForm from "./pages/clients/client-form";
import EmployeeList from "./pages/agency/employee/emp-list";
import EmployeeForm from "./pages/agency/employee/emp-form";
import ProjectsList from "./pages/agency/projects/project-list";
import ProjectForm from "./pages/agency/projects/project-form";
import Divider from "./pages/clients/divider";
import Asset from "./pages/agency/agency-assest";
import ClientList from "./pages/clients/client-list";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="verify-otp" element={<VerifyOtpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="agency" element={<Layout />}>
        <Route path="dashboard" element={<AgencyDashboard />} />
        <Route path="assets" element={<Asset />} />
        {/* clients */}
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/create" element={<ClientForm />} />
        <Route path="clients/edit/:id" element={<ClientForm />} />
        {/* employees */}
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/create" element={<EmployeeForm />} />
        <Route path="employees/edit/:id" element={<EmployeeForm />} />
        {/* projects */}
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/create" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
      </Route>

      {/* client */}
      <Route path="client-review" element={<Divider />} />
    </Routes>
  );
}

export default App;
