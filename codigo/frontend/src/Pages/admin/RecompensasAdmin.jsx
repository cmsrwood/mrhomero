import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../styles/style.css'
import Swal from 'sweetalert2'
import img from '../../assets/img/img.png'
import axios from 'axios'
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4400"

export default function RecompensasAdmin() {

  const [recompensas, setRecompensas] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recompensasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/recompensas/mostrar`)
        ]);
        setRecompensas(recompensasRes.data);
      } catch (error) {
        console.log(error);
      }
      setIsDataUpdated(false);
    };
    fetchData();
  }, [isDataUpdated]);

  //Agregar recompensa
  const [recompensa, setRecompensa] = useState({
    nombre: '',
    descripcion: '',
    puntos: '',
    foto: null
  })

  //Añade la imagen
  const handleFileChange = (e) => {
    setRecompensa({ ...recompensa, foto: e.target.files[0] });
  }

  const handleInputChange = (e) => {
    setRecompensa({ ...recompensa, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append('recompensa_nombre', recompensa.nombre);
    formData.append('recompensa_descripcion', recompensa.descripcion);
    formData.append('recomp_num_puntos', recompensa.puntos);
    formData.append('foto', recompensa.foto);


    try {
      await axios.post(`${BACKEND_URL}/api/recompensas/crearRecompensa`, formData);
      Swal.fire('Exito', 'Recompensa agregada correctamente', 'success');
      setRecompensa({
        nombre: '',
        descripcion: '',
        puntos: '',
        foto: null
      });

      setIsDataUpdated(true); // Actualiza el estado para volver a cargar los datos
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data, 'error');
    }
  }

  return (
    <div className=''>
      <div className="d-flex justify-content-between">
        <h1>Recompensas</h1>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#client_add"><i className="bi bi-plus"></i>Añadir</button>

        <div className="modal fade" id="client_add" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir recompensa</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-3 m-3 ps-3 pt-2">
                      <img src={img} height={250} className='card-img-center border' alt="..." />
                      <input className='form-control' onChange={handleFileChange} type="file" accept='image/*' autoComplete='off' id='foto' name='foto' required />
                    </div>
                    <div className="col">
                      <label htmlFor="floatingInput">Nombre</label>
                      <input type="text" name='nombre' onChange={handleInputChange} className="form-control my-2" placeholder="Nombre" />
                      <label htmlFor="floatingInput">Puntos</label>
                      <input type="text" name='puntos' onChange={handleInputChange} className="form-control my-2" placeholder="Puntos" />
                      <label htmlFor="floatingInput">Descripcion</label>
                      <textarea type="text" name='descripcion' onChange={handleInputChange} className="form-control my-2" placeholder="Descripción" id="floatingTextarea"></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i></button>
                  <button type="button" className="btn btn-success" onClick={handleSubmit}><i className="bi bi-check-circle"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          scrollbar={{ hide: true }}
          modules={[Scrollbar]}
        >
          {recompensas.map((recompensa) => (
            <SwiperSlide className="h-100" key={recompensa.id_recomp}>
              <div className="card text-center">
                <img src={`/images/recompensas/${recompensa.recomp_foto}`} height={200} className="card-img-top p-3" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{recompensa.recompensa_nombre}</h5>
                  <p className="card-text">{recompensa.recompensa_descripcion}</p>
                  <button type="button" className="btn btn-warning mx-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-pencil-square"></i></button>
                  <button type="button" className="btn btn-danger mx-4" onClick={() => {
                    Swal.fire({
                      icon: 'question',
                      title: '¿Estas seguro de eliminar esta recompensa?',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Eliminar',
                      cancelButtonColor: '#d33',
                      cancelButtonText: 'Cancelar',
                    }).then((result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: '¡Eliminado!',
                          text: 'La recompensa fue eliminada correctamente',
                          icon: 'success',
                          confirmButtonText: 'Hecho'
                        })
                      }
                    }))
                  }}><i className="bi bi-trash"></i></button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar información</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="conatiner">
                <div className="row">
                  <div className="col-3 m-3 ps-3 pt-2">
                    <img src={img} height={250} className="card-img-center border" alt="..." />
                    <input type="file" className="form-control mt-5" accept='image/*' />
                  </div>
                  <div className="col">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input type="text" className="form-control my-2" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"></input>
                    <label htmlFor="floatingInput">Tipo</label>
                    <select type="text" className="form-control my-2" placeholder="Tipo" aria-label="Username" aria-describedby="basic-addon1">
                      <option>Premio</option>
                      <option>Premio</option>
                      <option>Premio</option>
                      <option>Premio</option>
                      <option>Premio</option>
                    </select>
                    <label htmlFor="floatingInput">Puntos</label>
                    <input type="number" className="form-control my-2" placeholder="Puntos" aria-label="Username" aria-describedby="basic-addon1"></input>
                    <label htmlFor="floatingInput">Descripción</label>
                    <textarea className='form-control' id="descripcion" placeholder='Inserte la descripcion'></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i></button>
              <button type="button" className="btn btn-success" onClick={() => {
                Swal.fire({
                  icon: 'question',
                  title: '¿Desea guardar los cambios?',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, acepto',
                  cancelButtonText: 'Cancelar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      '¡Guardado!',
                      'Los cambios fueron guardados correctamente.',
                      'success'
                    )
                  }
                })
              }}><i className="bi bi-check2-square"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
