import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import NavegacionDefault from "./Plantilla/NavegacionDefault";
import IndexDefault from "./Pages/default/Index";
function App() {
  return (
    <div className="">
      <BrowserRouter>
      <NavegacionDefault/>
        <Routes>
          <Route exact path='/' element={<IndexDefault/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
