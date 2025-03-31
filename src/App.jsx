import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar componentes
import Loader from "./components/Loader";
import Producto from "./components/Producto";
import RutaPrivada from "./components/RutaPrivada";
import AdminLayout from "./components/AdminLayout";
import EmpleadoLayout from "./components/EmpleadoLayout";
import RutaPublica from "./components/RutaPublica";
import ClienteLayout from "./components/ClienteLayout";
import DefaultLayout from "./components/DefaultLayout";
import CategoriaMenu from "./components/CategoriaMenu";
import Error from "./components/Error";

// Importar las rutas para el default
const IndexDefault = lazy(() => import("./Pages/default/Index"));
const Registrar = lazy(() => import("./Pages/default/Registrar"));
const Ingresar = lazy(() => import("./Pages/default/Ingresar"));
const Nosotros = lazy(() => import("./Pages/default/NosotrosDefault"));
const MenuDefault = lazy(() => import("./Pages/default/MenuDefault"));
const EmailRecuperar = lazy(() => import("./Pages/default/EmailRecuperar"));
const Recuperar = lazy(() => import("./Pages/default/Recuperar"));
const Footer = lazy(() => import("./components/Footer"));
// Importar las rutas para el cliente
const IndexCliente = lazy(() => import("./Pages/cliente/IndexCliente"));
const HistorialCompras = lazy(() => import("./Pages/cliente/HistorialCompras"));
const MenuCliente = lazy(() => import("./Pages/cliente/MenuCliente"));
const CategoriaCliente = lazy(() => import("./Pages/cliente/CategoriaCliente"));
const ProductoCliente = lazy(() => import("./Pages/cliente/ProductoCliente"));
const PerfilCliente = lazy(() => import("./Pages/cliente/PerfilCliente"));
const RecompensasCliente = lazy(() => import("./Pages/cliente/RecompensasCliente"));
const NosotrosCliente = lazy(() => import("./Pages/cliente/NosotrosCliente"));
// Importar las rutas para el admin
const IndexAdmin = lazy(() => import("./Pages/admin/IndexAdmin"));
const Pedidos = lazy(() => import("./Pages/admin/Pedidos"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const Ventas = lazy(() => import("./Pages/admin/Ventas"));
const Inventario = lazy(() => import("./Pages/admin/Inventario"));
const MenuAdmin = lazy(() => import("./Pages/admin/MenuAdmin"));
const Categoria = lazy(() => import("./Pages/admin/Categoria"));
const Clientes = lazy(() => import("./Pages/admin/Clientes"));
const RecompensasObtenidas = lazy(() => import("./Pages/admin/RecompensasObtenidas"));
const RecompensasAdmin = lazy(() => import("./Pages/admin/RecompensasAdmin"));
const Empleados = lazy(() => import("./Pages/admin/Empleados"));
const HorasEmpleados = lazy(() => import("./Pages/admin/HorasEmpleados"));
const ProductoAdmin = lazy(() => import("./Pages/admin/ProductoAdmin"));
const Proveedores = lazy(() => import("./Pages/admin/Proveedores"));
const Gestionhoras = lazy(() => import("./Pages/admin/Gestionhoras"));

// Importar las rutas para el empleado
const RecompensasEmpleado = lazy(() => import("./Pages/empleado/RecompensasEmpleado"));
const ClientesEmpleado = lazy(() => import("./Pages/empleado/ClientesEmpleado"));
const Horas = lazy(() => import("./Pages/empleado/Horas"));


function App() {
  return (
    <div className="">
      <BrowserRouter>
          <Routes>
            {/* Rutas para el default */}
            <Route element={<RutaPublica />}>
              <Route element={<DefaultLayout />}>
                <Route exact path='/' element={<IndexDefault />}></Route>
                <Route path='/nosotros' element={<Nosotros />}></Route>
                <Route path='/registrar' element={<Registrar />}></Route>
                <Route path='/ingresar' element={<Ingresar />}></Route>
                <Route path="/recuperar" element={<Recuperar />}></Route>
                <Route path="/emailRecuperar" element={<EmailRecuperar />}></Route>
                <Route path='/menu' element={<MenuDefault />}></Route>
                <Route path="/categoria/:id" element={<CategoriaMenu />}></Route>
                <Route path="/producto/:id" element={<Producto />}></Route>
                <Route path="/footer" element={<Footer />}></Route>
              </Route>
            </Route>

            {/* Rutas para el admin */}
            <Route element={<RutaPrivada requiredRole={1} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/" element={<IndexAdmin />}></Route>
                <Route path="/admin/dashboard" element={<Dashboard />}></Route>
                <Route path="/admin/ventas" element={<Ventas />}></Route>
                <Route path="/admin/pedidos" element={<Pedidos />}></Route>
                <Route path="/admin/inventario" element={<Inventario />}></Route>
                <Route path="/admin/menu" element={<MenuAdmin />}></Route>
                <Route path="/admin/categoria/:id" element={<Categoria />}></Route>
                <Route path="/admin/producto/:id" element={<ProductoAdmin />}></Route>
                <Route path="/admin/recompensas" element={<RecompensasAdmin />}></Route>
                <Route path="/admin/recompensasObtenidas" element={<RecompensasObtenidas />}></Route>
                <Route path="/admin/clientes" element={<Clientes />}></Route>
                <Route path="/admin/empleados" element={<Empleados />}></Route>
                <Route path="/admin/horasempleados" element={<HorasEmpleados />}></Route>
                <Route path="/admin/proveedores" element={<Proveedores />}></Route>
                <Route path="/admin/perfil" element={<PerfilCliente />}></Route>
                <Route path="/admin/gestionhoras/:id" element={<Gestionhoras />}></Route>
              </Route>
            </Route>


            {/* Rutas para el empleado */}
            <Route element={<RutaPrivada requiredRole={2} />}>
              <Route element={<EmpleadoLayout />}>
                <Route path="/empleado/dashboard" element={<Dashboard />}></Route>
                <Route path="/empleado/ventas" element={<Ventas />}></Route>
                <Route path="/empleado/pedidos" element={<Pedidos />}></Route>
                <Route path="/empleado/inventario" element={<Inventario />}></Route>
                <Route path='/empleado/menu' element={<MenuDefault />}></Route>
                <Route path="/empleado/categoria/:id" element={<CategoriaMenu />}></Route>
                <Route path="/empleado/producto/:id" element={<Producto />}></Route>
                <Route path="/empleado/recompensas" element={<RecompensasEmpleado />}></Route>
                <Route path="/empleado/clientes" element={<ClientesEmpleado />}></Route>
                <Route path="/empleado/proveedores" element={<Proveedores />}></Route>
                <Route path="/empleado/perfil" element={<PerfilCliente />}></Route>
                <Route path="/empleado/horas" element={<Horas />}></Route>

              </Route>
            </Route>

            {/* Rutas para el cliente */}
            <Route element={<RutaPrivada requiredRole={3} />}>
              <Route element={<ClienteLayout />}>
                <Route path="/cliente/" element={<IndexCliente />}></Route>
                <Route path="/cliente/miscompras" element={<HistorialCompras />}></Route>
                <Route path="/cliente/menu" element={<MenuCliente />}></Route>
                <Route path="/cliente/perfil" element={<PerfilCliente />}></Route>
                <Route path="/cliente/recompensas" element={<RecompensasCliente />}></Route>
                <Route path="/cliente/nosotros" element={<NosotrosCliente />}></Route>
                <Route path="/cliente/categoria/:id" element={<CategoriaCliente />}></Route>
                <Route path="/cliente/producto/:id" element={<ProductoCliente />}></Route>
              </Route>
            </Route>
            <Route path="/loader" element={<Loader />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
