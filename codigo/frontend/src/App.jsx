import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Categoria from "./Pages/admin/Categoria";
import Producto from "./components/Producto";
import Proveedores from "./Pages/admin/Proveedores";


const Error = lazy(() => import("./components/Error"));

{/* Importar las rutas para el default*/ }
const IndexDefault = lazy(() => import("./Pages/default/Index"));
const Registrar = lazy(() => import("./Pages/default/Registrar"));
const Ingresar = lazy(() => import("./Pages/default/Ingresar"));
const Nosotros = lazy(() => import("./Pages/default/NosotrosDefault"));
const MenuDefault = lazy(() => import("./Pages/default/MenuDefault"));
const EmailRecuperar = lazy(() => import("./Pages/default/EmailRecuperar"));
const Recuperar = lazy(() => import("./Pages/default/Recuperar"));

{/* Importar las rutas para el cliente*/ }
const IndexCliente = lazy(() => import("./Pages/cliente/IndexCliente"));
const HistorialCompras = lazy(() => import("./Pages/cliente/HistorialCompras"));
const MenuCliente = lazy(() => import("./Pages/cliente/MenuCliente"));
const PerfilCliente = lazy(() => import("./Pages/cliente/PerfilCliente"));
const RecompensasCliente = lazy(() => import("./Pages/cliente/RecompensasCliente"));
const NosotrosCliente = lazy(() => import("./Pages/cliente/NosotrosCliente"));

{/* Importar las rutas para el admin*/ }
const IndexAdmin = lazy(() => import("./Pages/admin/IndexAdmin"));
const Pedidos = lazy(() => import("./Pages/admin/Pedidos"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const Ventas = lazy(() => import("./Pages/admin/Ventas"));
const Inventario = lazy(() => import("./Pages/admin/Inventario"));
const MenuAdmin = lazy(() => import("./Pages/admin/MenuAdmin"));
const Clientes = lazy(() => import("./Pages/admin/Clientes"));
const RecompensasAdmin = lazy(() => import("./Pages/admin/RecompensasAdmin"));
const Empleados = lazy(() => import("./Pages/admin/Empleados"));
const HorasEmpleados = lazy(() => import("./Pages/admin/HorasEmpleados"));
const ProductoAdmin = lazy(() => import("./Pages/admin/ProductoAdmin"));


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Rutas para el default */}
            <Route exact path='/' element={<IndexDefault />}> </Route>
            <Route path='/nosotros' element={<Nosotros />}> </Route>
            <Route path='/registrar' element={<Registrar />}> </Route>
            <Route path='/ingresar' element={<Ingresar />}> </Route>
            <Route path='/menu' element={<MenuDefault />}> </Route>
            <Route path="/recuperar" element={<Recuperar />} ></Route>
            <Route path="/emailRecuperar" element={<EmailRecuperar />}> </Route>
            <Route path="/loader" element={<Loader />}> </Route>

            {/* Rutas para el admin */}
            <Route path="/admin/" element={<IndexAdmin />}></Route>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/ventas" element={<Ventas />}></Route>
            <Route path="/admin/pedidos" element={<Pedidos />}></Route>
            <Route path="/admin/inventario" element={<Inventario />}></Route>
            <Route path="/admin/menu" element={<MenuAdmin />}></Route>
            <Route path="/admin/categoria/:id" element={<Categoria />}></Route>
            <Route path="/admin/producto/:id" element={<ProductoAdmin />}></Route>
            <Route path="/admin/recompensas" element={<RecompensasAdmin />}></Route>
            <Route path="/admin/clientes" element={<Clientes />}></Route>
            <Route path="/admin/empleados" element={<Empleados />}></Route>
            <Route path="/admin/horasempleados" element={<HorasEmpleados />}></Route>
            <Route path="/admin/proveedores" element={<Proveedores />} className=""></Route>


            {/* Rutas para el cliente */}
            <Route path="/cliente/" element={<IndexCliente />}> </Route>
            <Route path="/cliente/miscompras" element={<HistorialCompras />}></Route>
            <Route path="/cliente/menu" element={<MenuCliente />}></Route>
            <Route path="/cliente/perfil" element={<PerfilCliente />}></Route>
            <Route path="/cliente/recompensas" element={<RecompensasCliente />}></Route>
            <Route path="/cliente/nosotros" element={<NosotrosCliente />}></Route>
            <Route path="/producto" element={<Producto />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

//prueba
