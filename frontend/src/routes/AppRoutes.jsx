import { Routes, Route, Navigate } from 'react-router-dom';

import { VentasPage } from '../modules/ventas';
import { LoginPage, RegisterPage } from '../modules/auth';

import AdminDashboard from '../modules/admin/pages/AdminDashboard';
import VendedorDashboard from '../modules/vendedor/pages/VendedorDashboard';
import AlmacenDashboard from '../modules/almacen/pages/AlmacenDashboard';
import ProfilePage from '../modules/profile/pages/ProfilePage';
import AdminSolicitudesPage from '../modules/admin/pages/AdminSolicitudesPage';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/vendedor" element={<VendedorDashboard />} />
      <Route path="/almacen" element={<AlmacenDashboard />} />

      {/* Módulos */}
      <Route path="/ventas" element={<VentasPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/solicitudes" element={<AdminSolicitudesPage />} />

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;