import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function RecompensasObtenidas() {

    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const [recompensas, setRecompensas] = useState([]);
    const [recompensasObtenidas, setRecompensasObtenidas] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [searchTerm, setSearchTerms] = useState('');

    const handleSearch = (e) => {
        setSearchTerms(e.target.value);
    }

    const recompensasObtenidasFiltradas = recompensasObtenidas
        .filter(recompensasObtenida => {
            const term = searchTerm.toLowerCase();
            return (
                recompensas.find(recompensa => recompensa.id_recomp === recompensasObtenida.id_recomp).recompensa_nombre.toLowerCase().includes(term) ||
                recompensas.find(recompensa => recompensa.id_recomp === recompensasObtenida.id_recomp).recompensa_descripcion.toLowerCase().includes(term) ||
                clientes.find(cliente => cliente.id_user === recompensasObtenida.id_user).user_nom.toLowerCase().includes(term) ||
                clientes.find(cliente => cliente.id_user === recompensasObtenida.id_user).user_apels.toLowerCase().includes(term) ||
                recompensasObtenida.fecha_reclamo.toString().includes(term)
            );
        }
        );

    const [recompensaAValidar, setRecompensaAValidar] = useState({
        id_recomp_obt: '',
        id_recomp: '',
        id_cliente: '',
        codigo: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recompensasRes, recompensasObtenidasRes, clientesRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/tienda/recompensas/`),
                    axios.get(`${BACKEND_URL}/api/tienda/recompensas/recompensasObtenidas/recompensas`),
                    axios.get(`${BACKEND_URL}/api/personas/clientes/`)
                ]);
                setRecompensas(recompensasRes.data);
                setRecompensasObtenidas(recompensasObtenidasRes.data);
                setClientes(clientesRes.data);
            } catch (error) {
                console.log(error);
            }
            setIsDataUpdated(false);
        };
        fetchData();
    }, [isDataUpdated]);

    const validarRecompensa = async (e, id_recomp_obt) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${BACKEND_URL}/api/tienda/recompensas/validar/${id_recomp_obt}`, recompensaAValidar);
            Swal.fire({
                title: res.data.title,
                text: res.data.message,
                icon: 'success'
            }).then(() => {
                const modalElement = document.getElementById(`modalValidar`);
                let modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            })
            setIsDataUpdated(true);
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: err.response.data.title,
                text: err.response.data.message,
                icon: 'error',
                timer: 1000,
                showConfirmButton: false

            })
        }
    };

    const handleChange = (e) => {
        setRecompensaAValidar({
            ...recompensaAValidar,
            [e.target.name]: e.target.value
        })
    }

    function mostrarModal(recompensa_obtenida) {
        setRecompensaAValidar({
            id_recomp_obt: recompensa_obtenida.id_recomp_obt,
            id_recomp: recompensa_obtenida.id_recomp,
            id_cliente: recompensa_obtenida.id_user,
            codigo: '',
        })
    }

    return (
        <div className=''>
            <div className="input-group">
                <input
                    type="search"
                    className="form-control form-control-lg ps-5 w-100"
                    placeholder="Buscar recompensa..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <i className={`bi bi-search position-absolute top-50 translate-middle-y ms-3 text-secondary`}></i>
            </div>
            <div className="row mt-2 g-5 scrollbar">
                {recompensasObtenidasFiltradas.map((recompensaObtenida) => (
                    <div className="col-12 border my-2 p-5" key={recompensaObtenida.id_recomp_obt}>
                        <div className="row align-items-center">
                            <div className="col-2">
                                <img src={`${recompensas.find(recompensa => recompensa.id_recomp == recompensaObtenida.id_recomp).recomp_foto}`} className='rounded border img-fluid w-100' alt="" />
                            </div>
                            <div className="col-6 px-5 align-content-center">
                                <h2>{recompensas.find(recompensa => recompensa.id_recomp == recompensaObtenida.id_recomp).recompensa_nombre}</h2>
                                <p>{recompensas.find(recompensa => recompensa.id_recomp == recompensaObtenida.id_recomp).recompensa_descripcion}</p>
                                <p className='text-warning'>{clientes.find(cliente => cliente.id_user == recompensaObtenida.id_user).user_nom} {clientes.find(cliente => cliente.id_user == recompensaObtenida.id_user).user_apels}</p>
                                <p className=''>{moment(recompensaObtenida.fecha_reclamo).format('DD/MM/YYYY HH:mm')}</p>
                            </div>
                            <div className={`col-4 text-center`}>
                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" onClick={() => mostrarModal(recompensaObtenida)} data-bs-target={`#modalValidar`}>
                                    Validar recompensa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal validar */}
            <div className="modal" id='modalValidar' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={(e) => validarRecompensa(e, recompensaAValidar.id_recomp_obt)}>
                            <div className="modal-body">
                                <h5 className="modal-title" id="exampleModalLabel">Validar recompensa</h5>
                                <div className="form-floating my-5">
                                    <input type="text" pattern='[0-9]{6}' value={recompensaAValidar.codigo} onChange={handleChange} className="form-control" placeholder="codigo" name='codigo' required />
                                    <label htmlFor="floatingInput">Codigo</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success">Validar recompensa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
