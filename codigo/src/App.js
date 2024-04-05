import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import Navegacion from './Plantilla/Navegacion';
import MiGrafico from './graficas/MiGrafico';
import MiGrafico2 from './graficas/MiGrafico2';
function App() {
  return (
    <div className="container-fluid text-center">
      <BrowserRouter>
      <Navegacion/>
        <Routes>
          <Route path='/' element={<MiGrafico/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
