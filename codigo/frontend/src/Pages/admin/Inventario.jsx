import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import NavegacionAdmin from '../../navigation/NavegacionAdmin'
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Inventario() {

  const navigate = useNavigate();

  const [ingrediente, setIngrediente] = useState({
    inv_nombre: '',
    inv_categoria: '',
    inv_fecha_ing: '',
    inv_fecha_cad: '',
    inv_cantidad: '',
    inv_cantidad_min: '',
  })


  const handleChange = (e) => {
    setIngrediente(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND_URL}/inventario/crear`, ingrediente)
      Swal.fire({
        icon: 'success',
        title: 'Ingrediente creado exitosamente',
      })
      setIsDataUpdated(true)
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data,
      })
    }
  }

  const [inventario, setInventario] = useState([])
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const traerInventario = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/inventario/mostrar`)
        setInventario(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    traerInventario()
  }, [])

  const [bajoStockIngredientes, setBajoStockIngredientes] = useState([]);

  useEffect(() => {
    const filterBajoStock = () => {
      const filtered = inventario.filter(
        (ingrediente) => ingrediente.inv_cantidad < ingrediente.inv_cantidad_min
      );
      setBajoStockIngredientes(filtered);
    };

    filterBajoStock();
  }, [inventario]);

  const borrarInventario = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de borrar este ingrediente?',
        text: "No podras revertir esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar'
      });
      if (!confirm.isConfirmed) {
        return;
      }
      const res = await axios.delete(`${BACKEND_URL}/inventario/borrar/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data
      })
    }
  }

  useEffect(() => {
    if (isDataUpdated) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/inventario/mostrar`);
          setInventario(res.data);
          setIsDataUpdated(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isDataUpdated]);

  return (
    <div className='d-flex'>
      <NavegacionAdmin />
      <div className='container content'>
        <div className="row g-5 justify-content-center">
          <div className="col-12 col-sm-8 ">
            <div className="d-flex justify-content-between mb-5">
              <h1>Inventario</h1>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalCrearProducto"><i className="bi bi-plus"></i>Añadir</button>
              <div className="modal fade" id="ModalCrearProducto" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" >Añadir producto</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="row p-3">
                        <form className="">
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput" className='form-label'>Nombre</label>
                            <input className='form-control' type="text" autoComplete='off' id='inv_nombre' name='inv_nombre' placeholder='Ej. Tomate' required onChange={handleChange} />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Categoría</label>
                            <select name="inv_categoria" className="form-select" id="" required onChange={handleChange}>
                              <option value="x" selected disabled>Categoría...</option>
                              <option value="1" >Hamburguesas</option>
                              <option value="2" >Choriperro</option>
                              <option value="3" >Salchipapa</option>
                            </select>
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Fecha de ingreso</label>
                            <input className='form-control' type="date" autoComplete='off' id='inv_fecha_ing' name='inv_fecha_ing' required onChange={handleChange} />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Fecha de caducidad</label>
                            <input className='form-control' type="date" autoComplete='off' id='inv_fecha_cad' name='inv_fecha_cad' required onChange={handleChange} />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Cantidad</label>
                            <input className='form-control' type="number" autoComplete='off' id='inv_cantidad' name='inv_cantidad' required onChange={handleChange} />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Cantidad min</label>
                            <input className='form-control' type="number" autoComplete='off' id='inv_cantidad_min' name='inv_cantidad_min' required onChange={handleChange} />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                      <button type="submit" className="btn btn-warning" onClick={handleClick}>Guardar cambios</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive scrollbar">
              <table className=" table table-striped table-scrollbar">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Fecha de ingreso</th>
                    <th scope="col">Fecha de caducidad</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Cantidad min</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {inventario.map((ingrediente) => (
                    <tr key={ingrediente.id_producto_inv}>
                      <th scope="row">{ingrediente.id_producto_inv}</th>
                      <td>{ingrediente.inv_nombre}</td>
                      <td>{ingrediente.inv_categoria}</td>
                      <td>{ingrediente.inv_fecha_ing}</td>
                      <td>{ingrediente.inv_fecha_cad}</td>
                      <td>{ingrediente.inv_cantidad}</td>
                      <td>{ingrediente.inv_cantidad_min}</td>
                      <td>
                        <div className="d-flex">
                          <button type="button" className="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#ModalEditarCategoria">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <div className="modal fade" id="ModalEditarCategoria" tabIndex="-1" aria-labelledby="ModalEditarCategoriaLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="ModalEditarCategoriaLabel">Editar producto</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <form className="">
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput" className='form-label'>Nombre</label>
                                      <input className='form-control' type="text" autoComplete='off' id='inv_nombre' name='inv_nombre' placeholder='Ej. Tomate' required onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput">Categoría</label>
                                      <select name="inv_categoria" className="form-select" id="" required onChange={handleChange}>
                                        <option value="x" selected disabled>Categoría...</option>
                                        <option value="1" >Hamburguesas</option>
                                        <option value="2" >Choriperro</option>
                                        <option value="3" >Salchipapa</option>
                                      </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput">Fecha de ingreso</label>
                                      <input className='form-control' type="date" autoComplete='off' id='inv_fecha_ing' name='inv_fecha_ing' required onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput">Fecha de caducidad</label>
                                      <input className='form-control' type="date" autoComplete='off' id='inv_fecha_cad' name='inv_fecha_cad' required onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput">Cantidad</label>
                                      <input className='form-control' type="number" autoComplete='off' id='inv_cantidad' name='inv_cantidad' required onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                      <label htmlFor="floatingInput">Cantidad min</label>
                                      <input className='form-control' type="number" autoComplete='off' id='inv_cantidad_min' name='inv_cantidad_min' required onChange={handleChange} />
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                  <button type="button" className="btn btn-warning">Guardar cambios</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="button" className="btn btn-danger" onClick={() => borrarInventario(ingrediente.id_producto_inv)}><i className="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Total de registros: {inventario.length}</p>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link text-warning" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link text-warning" href="#">1</a></li>
                <li className="page-item"><a className="page-link text-warning" href="#">2</a></li>
                <li className="page-item"><a className="page-link text-warning" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link text-warning" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-10 col-sm-4 scrollbar">
            <h2 className='pb-5'>Bajo stock ({bajoStockIngredientes.length})</h2>
            <div className="row g-3">
              {bajoStockIngredientes.map((ingrediente) => (
                <div className={`card bg-warning col-6 col-sm-12 bg-opacity-75 text-dark`} key={ingrediente.id_producto_inv}>
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h3 className="card-title">{ingrediente.inv_nombre}</h3>
                        <h4 className="card-text">{ingrediente.inv_cantidad}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
