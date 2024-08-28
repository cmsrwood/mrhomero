import { BrowserRouter, Routes, Route } from "react-router-dom";

{/* Importar las rutas para el default*/ }
import IndexDefault from "./Pages/default/Index";
import Registrar from "./Pages/default/Registrar";
import Ingresar from "./Pages/default/Ingresar";
import Nosotros from "./Pages/default/NosotrosDefault";
import MenuDefault from "./Pages/default/MenuDefault";
import EmailRecuperar from "./Pages/default/EmailRecuperar";
import Recuperar from "./Pages/default/Recuperar";

{/* Importar las rutas para el cliente*/ }
import IndexCliente from "./Pages/cliente/IndexCliente";
import HistorialCompras from "./Pages/cliente/HistorialCompras";
import MenuCliente from "./Pages/cliente/MenuCliente";
import PerfilCliente from "./Pages/cliente/PerfilCliente";
import RecompensasCliente from "./Pages/cliente/RecompensasCliente";
import NosotrosCliente from "./Pages/cliente/NosotrosCliente";

{/* Importar las rutas para el admin*/ }
import IndexAdmin from "./Pages/admin/IndexAdmin";
import Pedidos from "./Pages/admin/Pedidos";
import Dashboard from "./Pages/admin/Dashboard";
import Ventas from "./Pages/admin/Ventas";
import Inventario from "./Pages/admin/Inventario";
import MenuAdmin from "./Pages/admin/MenuAdmin";
import Clientes from "./Pages/admin/Clientes";
import Empleados from "./Pages/admin/Empleados";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {/* Rutas para el default */}
          <Route exact path='/' element={<IndexDefault />}> </Route>
          <Route path='/nosotros' element={<Nosotros />}> </Route>
          <Route path='/registrar' element={<Registrar />}> </Route>
          <Route path='/ingresar' element={<Ingresar />}> </Route>
          <Route path='/menu' element={<MenuDefault />}> </Route>
          <Route path="/recuperar" element={<Recuperar />} ></Route>
          <Route path="/emailRecuperar" element={<EmailRecuperar />}> </Route>

          {/* Rutas para el admin */}
          <Route path="/admin/" element={<IndexAdmin />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/ventas" element={<Ventas />}></Route>
          <Route path="/admin/pedidos" element={<Pedidos />}></Route>
          <Route path="/admin/inventario" element={<Inventario />}></Route>
          <Route path="/admin/menu" element={<MenuAdmin />}></Route>
          <Route path="/admin/clientes" element={<Clientes />}></Route>
          <Route path="/admin/empleados" element={<Empleados />}></Route>


          {/* Rutas para el cliente */}
          <Route path="/cliente/inicio" element={<IndexCliente />}> </Route>
          <Route path="/cliente/historial" element={<HistorialCompras />}></Route>
          <Route path="/cliente/menu" element={<MenuCliente />}></Route>
          <Route path="/cliente/perfil" element={<PerfilCliente />}></Route>
          <Route path="/cliente/recompensas" element={<RecompensasCliente />}></Route>
          <Route path="/cliente/nosotros" element={<NosotrosCliente />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//prueba
