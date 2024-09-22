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
import DatesView from "./Pages/DatesView";
import SellerHistory from "./Pages/SellerHistory";
import CreateProduct from "./Pages/CreateProduct";
import StockPage from "./Pages/StockPage";
import ViewProducts from "./Pages/ViewProducts";
import MakeSale from "./Pages/MakeSale";
import HistorialVentas from "./Pages/SaleCard";
import CheckInCheckOut from "./Pages/CheckInCheckOut";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" duration={3000} />

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
            <Route path="/historial-citas" element={<DatesView />} />

            {/* Nota: A la venta, en el flujo debemos marcar cita cuando empezamos, la cita, debemos tomar tiempo, si en la cita vendemos, debemos enviar informacion de la cita en la venta, y al revé<s></s>
            Nota: configurar el horario
            Nota: La cita debe marcar si vendimos en ella o no
            Nota: Los checks de entrada debe marcar entrada, pero la salida debe marcarse al final, solucionar eso. 
            
            NOTA: MAÑANA TERMINAR EL CHECK, MOSTRAR INFO SOBRE LA ENTRADA MÁS RECIENTE,  Y OTROS
            */}

            <Route
              path="/historial-empleados-check"
              element={<SellerHistory />}
            />
            <Route path="/crear-productos" element={<CreateProduct />} />
            <Route path="/asignar-stock" element={<StockPage />} />
            <Route path="/ver-productos" element={<ViewProducts />} />

            <Route path="/hacer-ventas" element={<MakeSale />} />

            <Route path="/historial-ventas" element={<HistorialVentas />} />

            <Route
              path="/registrar-entrada-salida"
              element={<CheckInCheckOut />}
            />

            {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
