import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import NavegacionAdmin from '../../navigation/NavegacionAdmin';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400";

export default function Categoria() {

  const location = useLocation();
  const categoriaId = location.pathname.split("/")[3];

  const [productos, setProductos] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/menu/mostrarProductos/${categoriaId}`),
        ]);
        setProductos(productosRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);



  return (
    <div className="d-flex">
      <NavegacionAdmin />
      <div className="container content justify-content-between">
        <div className="d-flex justify-content-between mb-5">
          <h1>Nombre de la categoria</h1>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#MenuAdminModal">
            <i className="bi bi-plus-circle"></i> Añadir producto
          </button>
        </div>

        <div className="modal fade" id="MenuAdminModal" tabIndex="-1" aria-labelledby="MenuModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="MenuModalLabel">Agregar categoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Imagen</label>
                    <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className='form-control' type="text" autoComplete='off' id='nom_cat' name='nom_cat' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="floatingInput">Precio</label>
                    <input className='form-control' type="number" autoComplete='off' id='nom_cat' name='nom_cat' required min={0} step={50} />
                  </div>
                  <div className="col-12 mb-3">
                    <select name="" className="form-select" id="" required>
                      <option value="1" selected disabled>Categoria...</option>
                      <option value="2">Hamburguesas</option>
                      <option value="3">Perros Calientes</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success" onClick={() => {
                  Swal.fire({
                    title: 'Producto añadido',
                    text: 'El producto fue añadido correctamente',
                    icon: 'success',
                    confirmButtonText: 'Hecho'
                  })
                }}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
          {productos.map((item) => (
            <div className="col my-2" key={item.id_producto}>
              <div className="card text-center p-2">
                <img src={item.pro_foto} height={200} className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className=" justify-content-between align-items-center">
                    <h3 className="card-title">{item.pro_nom}</h3>
                    <div className="row">
                      <div className="col">
                        <NumericFormat value={item.pro_precio} displayType={'text'} thousandSeparator=',' prefix={'$ '} />
                      </div>
                    </div>
                  </div>
                </div>
                <d className="flex">
                  <button type="button" className="btn btn-warning ms-2"><i className="bi bi-pencil-square"></i> Editar</button>
                  <button type="button" className="btn btn-danger ms-2"><i className="bi bi-trash"></i> Eliminar</button>
                </d>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
