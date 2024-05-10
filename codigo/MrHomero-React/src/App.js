import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import NavegacionDefault from "./Plantilla/NavegacionDefault";
import MiGrafico from "./graficas/MiGrafico"
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
      <NavegacionDefault/>
        <Routes>
          <Route exact path='/' element={<MiGrafico/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
