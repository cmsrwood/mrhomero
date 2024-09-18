import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import NavegacionAdmin from '../../navigation/NavegacionAdmin';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Inventario() {

  // Traer los datos de la base de datos
  const [inventario, setInventario] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  // Bajo stock
  const [bajoStockIngredientes, setBajoStockIngredientes] = useState([]);

  // Modal para añadir
  const [ingrediente, setIngrediente] = useState({
    inv_nombre: '',
    id_categoria_inv: '',
    inv_fecha_ing: '',
    inv_fecha_cad: '',
    inv_cantidad: '',
    inv_cantidad_min: '',
    inv_proveedor: '',
  });

  // Modal para editar

  const [ingredienteEditar, setIngredienteEditar] = useState({
    inv_nombre: '',
    id_categoria_inv: '',
    inv_fecha_ing: '',
    inv_fecha_cad: '',
    inv_cantidad: '',
    inv_cantidad_min: '',
    inv_proveedor: '',
  });


  // Función para mostrar los ingredientes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/inventario/mostrar`);
        setInventario(res.data);
        setBajoStockIngredientes(res.data.filter((ingrediente) => ingrediente.inv_cantidad < ingrediente.inv_cantidad_min));
        setIsDataUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isDataUpdated]);

  // Función para crear los ingredientes

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/inventario/crear`, ingrediente);
      Swal.fire({
        icon: 'success',
        title: 'Ingrediente creado exitosamente',
      });
      if (res.status === 200) {
        setIsDataUpdated(true); // Esto ya desencadenará la actualización en el `useEffect`
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data,
      });
    }
  };

  // Handle change para añadir
  const handleChange = (e) => {
    setIngrediente(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


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
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
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
      });
    }
  };

  useEffect(() => {
    if (isDataUpdated) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/inventario/mostrar`);
          setInventario(res.data);
          setBajoStockIngredientes(res.data.filter(ingrediente => ingrediente.inv_cantidad < ingrediente.inv_cantidad_min));
        } catch (error) {
          console.log(error);
        } finally {
          setIsDataUpdated(false);
        }
      };
      fetchData();
    }
  }, [isDataUpdated]);


  const editarInventario = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro de editar este ingrediente?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, editar'
      });
      if (confirm.isConfirmed) {
        const res = await axios.put(`${BACKEND_URL}/inventario/actualizar/${id}`, ingredienteEditar);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: res.data
          });
          setIsDataUpdated(true);
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data
      });
    }
  };

  const handleEditChange = (e) => {
    setIngredienteEditar(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function openEditModal(ingrediente) {
    setIngredienteEditar(ingrediente);
  }

  const [categorias, setCategorias] = useState([]);

  //function para datos del select de categorias
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/inventario/categorias`);
        setCategorias(res.data);
        setIsDataUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isDataUpdated]);

  const [proveedores, setProveedores] = useState([]);

  //function para datos del select de proveedor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/inventario/proveedores`);
        setProveedores(res.data);
        setIsDataUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isDataUpdated]);

  return (
    <div className='d-flex'>
      <NavegacionAdmin />
      <div className='container content'>
        <div className="row g-5 justify-content-center">
          <div className="col-12 col-sm-9 ">
            <div className="d-flex justify-content-between mb-5">
              <h1>Inventario</h1>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalCrearProducto"><i className="bi bi-plus"></i>Añadir</button>
              <div className="modal fade" id="ModalCrearProducto" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">Añadir producto</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="row p-3">
                        <form>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput" className='form-label'>Nombre</label>
                            <input className='form-control' type="text" autoComplete='off' id='inv_nombre' name='inv_nombre' placeholder='Ej. Tomate' required onChange={handleChange} />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Categoría</label>
                            <select className='form-select' id='id_categoria_inv' name='id_categoria_inv' value={ingrediente.id_categoria_inv} required onChange={handleChange}>
                              <option value="" disabled>Selecciona una categoría</option>
                              {categorias.map(categoria => (
                                <option key={categoria.id_categoria_inv} value={categoria.id_categoria_inv}>{categoria.categoria_inv_nom}</option>
                              ))}
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
                          <div className="col-12 mb-3">
                            <label htmlFor="floatingInput">Proveedor</label>
                            <select className='form-select' id='inv_proveedor' name='inv_proveedor' value={ingrediente.inv_proveedor} required onChange={handleChange}>
                              <option value="" disabled>Selecciona una categoría</option>
                              {proveedores.map(prov => (
                                <option key={prov.id_proveedor} value={prov.id_proveedor}>{prov.prov_nombre}</option>
                              ))}
                            </select>
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
              <table className="table table-striped table-scrollbar table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Fecha de ingreso</th>
                    <th scope="col">Fecha de caducidad</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Cantidad mínima</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inventario.map((ingrediente, i) => (
                    <tr key={i}>
                      <th scope="row">{ingrediente.id_producto_inv}</th>
                      <td>{ingrediente.inv_nombre}</td>
                      <td>{categorias.find(categoria => categoria.id_categoria_inv === ingrediente.id_categoria_inv).categoria_inv_nom}</td>
                      <td>{ingrediente.inv_fecha_ing}</td>
                      <td>{ingrediente.inv_fecha_cad}</td>
                      <td>{ingrediente.inv_cantidad}</td>
                      <td>{ingrediente.inv_cantidad_min}</td>
                      <td>{proveedores.find(prov => prov.id_proveedor === ingrediente.id_proveedor).prov_nombre}</td>
                      <td className={ingrediente.inv_cantidad < ingrediente.inv_cantidad_min ? 'text-danger' : 'text-success'}>{ingrediente.inv_cantidad < ingrediente.inv_cantidad_min ? 'Stock bajo' : 'Suficiente'}</td>
                      <td className=''>
                        <div className="d-flex justify-content-betwee">
                          <button type="button" className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#ModalEditProducto" onClick={() => openEditModal(ingrediente)}><i className="bi bi-pencil"></i></button>
                          <button type="button" className="btn btn-danger" onClick={() => borrarInventario(ingrediente.id_producto_inv)}><i className="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total de ingredientes: {inventario.length}</p>
            </div>
          </div>
          <div className="col-10 col-sm-3 scrollbar">
            <h2 className='pb-5'>Bajo stock ({bajoStockIngredientes.length})</h2>
            <div className="row g-3">
              {bajoStockIngredientes.map((ingrediente) => (
                <div className={`card bg-warning col-6 col-sm-12 bg-opacity-75 text-dark`} key={ingrediente.id_producto_inv}>
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h3 className="card-title">{ingrediente.inv_nombre}</h3>
                        <h4 className="">{`${ingrediente.inv_cantidad}/${ingrediente.inv_cantidad_min}`}</h4>
                        <p>Falta {ingrediente.inv_cantidad_min - ingrediente.inv_cantidad} unidades</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal fade" id="ModalEditProducto" tabIndex="-1" aria-labelledby="ModalEditProductoLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="ModalEditProductoLabel">Editar producto</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <form>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput" className='form-label'>Nombre</label>
                      <input className='form-control' type="text" autoComplete='off' id='inv_nombre' name='inv_nombre' value={ingredienteEditar.inv_nombre} required onChange={handleEditChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Categoría</label>
                      <select className='form-select' id='id_categoria_inv' name='id_categoria_inv' value={ingredienteEditar.id_categoria_inv} required onChange={handleEditChange}>
                        <option value="" disabled>Selecciona una categoría</option>
                        {categorias.map(categoria => (
                          <option key={categoria.id_categoria_inv} value={categoria.id_categoria_inv}>{categoria.categoria_inv_nom}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Fecha de ingreso</label>
                      <input className='form-control' type="date" autoComplete='off' id='inv_fecha_ing' name='inv_fecha_ing' value={ingredienteEditar.inv_fecha_ing} required onChange={handleEditChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Fecha de caducidad</label>
                      <input className='form-control' type="date" autoComplete='off' id='inv_fecha_cad' name='inv_fecha_cad' value={ingredienteEditar.inv_fecha_cad} required onChange={handleEditChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Cantidad</label>
                      <input className='form-control' type="number" autoComplete='off' id='inv_cantidad' name='inv_cantidad' value={ingredienteEditar.inv_cantidad} required onChange={handleEditChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Cantidad min</label>
                      <input className='form-control' type="number" autoComplete='off' id='inv_cantidad_min' name='inv_cantidad_min' value={ingredienteEditar.inv_cantidad_min} required onChange={handleEditChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="floatingInput">Proveedor</label>
                      <select className='form-select' id='id_proveedor' name='id_proveedor' value={ingredienteEditar.id_proveedor} required onChange={handleEditChange}>
                        <option value="" disabled>Selecciona un proveedor</option>
                        {proveedores.map(prov => (
                          <option key={prov.id_proveedor} value={prov.id_proveedor}>{prov.prov_nombre}</option>
                        ))}
                      </select>

                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-warning" onClick={() => editarInventario(ingredienteEditar.id_producto_inv)} >Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
