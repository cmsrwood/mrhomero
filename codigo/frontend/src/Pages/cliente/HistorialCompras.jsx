import React, { useState, useEffect } from 'react'
import axios from 'axios'
import img from '../../assets/img/img.png'

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function HistorialCompras() {

    const [compras, setCompras] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [id_compra, setIdCompra] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [comprasRes, clientesRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/ventas/mostrar`),
                    axios.get(`${BACKEND_URL}/api/clientes/mostrar`)
                ])
                setCompras(comprasRes.data);
                setClientes(clientesRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated]);

    const mostrarDetallesCompras = (id_compra) => {
        setIdCompra(id_compra);
        try {
            const detalleVentares = axios.get(`${BACKEND_URL}/api/ventas/mostrarDetalleVenta/${id_compra}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="">
                <div className="d-flex  justify-content-around">
                    <h1 className="py-3">Historial de compras</h1>
                    <h1 className="ps-5 py-3">Puntos ganados</h1>
                </div>
                <div className="row">
                    <div className="col col-sm-6">
                        {compras.map((compra) => (
                            <div className="container-card scrollbar" key={compra.id_user}>
                                <div className='d-flex rounded mb-3 border'>
                                    <div className="card-body ps-2 pt-2">
                                        <h1 className="card-title">Compra realizada</h1>
                                        <h5 className="card-text py-2">Fecha</h5>
                                    </div>
                                    <div className="card-price ps-2 pt-2 ">
                                        <button type="button" className="my-2 btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i class="bi bi-eye"></i>
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <table class="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Cantidad</th>
                                                                    <th scope="col">Producto</th>
                                                                    <th scope="col">Puntos</th>
                                                                    <th scope="col">Precio</th>
                                                                    <th scope="col">Metodo Pago</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>Mark</td>
                                                                    <td>Otto</td>
                                                                    <td>@mdo</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">2</th>
                                                                    <td>Jacob</td>
                                                                    <td>Thornton</td>
                                                                    <td>@fat</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">3</th>
                                                                    <td colspan="2">Larry the Bird</td>
                                                                    <td>@twitter</td>
                                                                </tr>
                                                                <tr className='fw-bold'>
                                                                    <td>Total</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="col col-sm-6">
                        <h2 className="ps-4 py-2 d-flex justify-content-center" style={{ fontSize: '68px' }}>99</h2>
                        <h3 className="ps-4 py-2 d-flex justify-content-center" style={{ fontSize: '50px' }}>Puntos</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
