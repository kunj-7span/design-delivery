import AgencyClients from "./pages/agency/agency-clients"
import AgencyDashboard from "./pages/agency/agency-dashboard"
import AgencyEmployees from "./pages/agency/agency-employees"
import AgencyProjects from "./pages/agency/agency-projects"
import Layout from "./pages/layout"
import { Navigate, Route, Routes } from "react-router-dom"



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/agency-dashboard" replace />} />
        <Route path="agency-dashboard" element={<AgencyDashboard />} />
        <Route path="employees" element={<AgencyEmployees />} />
        <Route path="clients" element={<AgencyClients />} />
        <Route path="projects" element={<AgencyProjects />} />
      </Route>
    </Routes>
  )
}

export default App
