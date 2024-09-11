import "./App.css";
import Login from "./components/Auth/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Layout from "./components/Layout/Layout"; // Asegúrate de que la ruta sea correcta
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/ComponentsMainDashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Envuelve las rutas protegidas con Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
