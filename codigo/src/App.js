import MiGrafico from './graficas/MiGrafico';
import MiGrafico2 from './graficas/MiGrafico2';
import Header from './reuse/header';
function App() {
  return (
    <div className="container-fluid text-center">
      <Header></Header>
      <div className='container'>
        <div className='row'>  <h1>Mr. Homero</h1>
          <div className='col-6'>
            <MiGrafico></MiGrafico>
          </div> 
          <div className='col-6'>
            <MiGrafico2></MiGrafico2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
