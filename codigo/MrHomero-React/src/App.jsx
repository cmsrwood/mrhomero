import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import NavegacionDefault from "./Plantilla/NavegacionDefault";
import IndexDefault from "./Pages/default/Index";
import Nosotros from "./Pages/default/Nosotros";
function App() {
  return (
    <div className="">
      <BrowserRouter>
      <NavegacionDefault/>
        <Routes>
          <Route exact path='/' element={<IndexDefault/>}> </Route>
          <Route path='/nosotros' element={<Nosotros/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
