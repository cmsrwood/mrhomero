import MiGrafico from './graficas/MiGrafico';
function App() {
  return (
    <div className="container text-center">
      <div className='row'>
        <h1 className='col-6 border'>Mr. Homero</h1>
        <div className='col-6 border'>
          <MiGrafico></MiGrafico>
          </div>   
      </div>
    </div>
  );
}
export default App;
