import "./App.css";
import Login from "./components/Auth/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Layout from "./components/Layout/Layout"; // Asegúrate de que la ruta sea correcta
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./components/ComponentsMainDashboard/AdminDashboard";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import CreateUser from "./components/Auth/CreateUser";
import { Toaster } from "sonner";
import Customers from "./Pages/Customers";
import Users from "./Pages/Users";
import Sales from "./Pages/Sales";
import Employees from "./Pages/Employees";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />

        <Routes>
          {/* Redirige de "/" a "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />

          {/* Envuelve las rutas protegidas con Layout */}
          <Route element={<Layout />}>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Customers />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/ventas" element={<Sales />} />
            <Route path="/empleados" element={<Employees />} />

            {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
