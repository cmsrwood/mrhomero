import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import Navegacion from './Plantilla/Navegacion';
import MiGrafico from './graficas/MiGrafico';
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
      <Navegacion/>
        <Routes>
          <Route path='/' element> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
