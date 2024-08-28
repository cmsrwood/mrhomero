import { BrowserRouter, Routes, Route } from "react-router-dom";

{/* Importar las rutas para el default*/}
import IndexDefault from "./Pages/default/Index";
import Registrar from "./Pages/default/Registrar";
import Ingresar from "./Pages/default/Ingresar";
import Nosotros from "./Pages/default/Nosotros";
import Menu from "./Pages/default/Menu";
import EmailRecuperar from "./Pages/default/EmailRecuperar";
import Recuperar from "./Pages/default/Recuperar";

{/* Importar las rutas para el admin*/}
import NavegacionAdmin from "./navigation/NavegacionAdmin";

{/* Importar las rutas para el cliente*/}
import IndexCliente from "./Pages/cliente/IndexCliente";
import HistorialCompras from "./Pages/cliente/HistorialCompras";
import MenuCliente from "./Pages/cliente/MenuCliente";
import PerfilCliente from "./Pages/cliente/PerfilCliente";
import RecompensasCliente from "./Pages/cliente/RecompensasCliente";

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
          <Route path='/menu' element={<Menu />}> </Route>
          <Route path="/navegacionadmin" element={<NavegacionAdmin />}> </Route>
          <Route path="/recuperar" element={<Recuperar />} ></Route>
          <Route path="/emailRecuperar" element={<EmailRecuperar />}> </Route>
          <Route path="/inicio" element={<IndexCliente />}> </Route>

          {/* Rutas para el cliente */}
          <Route path="/historial" element={<HistorialCompras />}></Route>
          <Route path="/menucliente" element={<MenuCliente />}></Route>
          <Route path="/perfil" element={<PerfilCliente />}></Route>
          <Route path="/recompensas" element={<RecompensasCliente />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//prueba
