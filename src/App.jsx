import AgencyDashboard from "./pages/agency/agency-dashboard";
import ClientList from "./pages/agency/clients/client-list";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/auth/login-page'
import RegisterPage from './pages/auth/register-page'
import ClientForm from "./pages/agency/clients/client-form";
import EmployeeList from "./pages/agency/employee/emp-list";
import EmployeeForm from "./pages/agency/employee/emp-form";
import ProjectsList from "./pages/agency/projects/project-list";
import ProjectForm from "./pages/agency/projects/project-form";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<RegisterPage />} />
      <Route path="reset-password" element={<RegisterPage />} />
      <Route path="agency" element={<Layout />}>
        <Route path="dashboard" element={<AgencyDashboard />} />
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
    </Routes>
  );
}

export default App;
