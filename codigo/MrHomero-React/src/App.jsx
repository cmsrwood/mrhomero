import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import NavegacionDefault from "./Plantilla/NavegacionDefault";
import MiGrafico from "./Graficas/MiGrafico"
import Index from "./Pages/default/Index";
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
      <NavegacionDefault/>
        <Routes>
          <Route exact path='/' element={<Index/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
