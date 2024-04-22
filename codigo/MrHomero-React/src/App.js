import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import NavegacionDefault from "./Plantilla/NavegacionDefault";
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
      <NavegacionDefault/>
        <Routes>
          <Route path='/' element> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
