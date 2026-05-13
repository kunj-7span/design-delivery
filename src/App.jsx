import AgencyDashboard from "./pages/agency/agency-dashboard";
import AgencyEmployees from "./pages/agency/agency-employees";
import AgencyProjects from "./pages/agency/agency-projects";
import ClientItem from "./pages/agency/clients/item";
import ClientList from "./pages/agency/clients/list";
import Layout from "./pages/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/auth/login-page'
import RegisterPage from './pages/auth/register-page'

function App() {
  return (
    <Routes>
      <Route path="/" />
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<RegisterPage />} />
        <Route path="reset-password" element={<RegisterPage />} />
      <Route path="agency" element={<Layout />}>
        <Route index element={<AgencyDashboard />} />
        <Route path="employees" element={<AgencyEmployees />}>
          <Route path="id" element={<AgencyEmployees />} />
        </Route>
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/create" element={<ClientItem />} />
        <Route path="clients/edit/:id" element={<ClientItem />} />
        <Route path="projects" element={<AgencyProjects />} />
      </Route>
    </Routes>
  );
}

export default App;
