import React, { useState, useEffect, useRef } from 'react'
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
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recompensasRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/tienda/recompensas/`)
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
      const response = await axios.post(`${BACKEND_URL}/api/tienda/recompensas/crear`, formData);
      Swal.fire('Exito', 'Recompensa agregada correctamente', 'success');
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.message
        });
        setIsDataUpdated(true);
        setRecompensa({
          nombre: '',
          descripcion: '',
          puntos: '',
          foto: null
        });
      }

      setIsDataUpdated(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear una recompensa',
        text: error.response.data.message
      });
    }

    const modalElement = document.getElementById('añadirRecompensa');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    resetFoto();
  }

  //useREf para limpiar el input de la imagen 
  const fileInputRef = useRef(null);

  //Función para resetear el input dela imagen
  const resetFoto = () => {
    fileInputRef.current.value = '';
  }

  //Previsualizar imagen
  // const [image, setImage] = useState(null);
  // const handleChangeImage = (e) => {
  //   const file = e.target.files[0];
  //   if(file) {
  //     setImage(URL.createObjectURL(file));
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     if (image) URL.revokeObjectURL(image);
  //   }
  // })


  //Editar recompensa
  const [editarRecompensa, setEditarRecompensa] = useState({
    id: '',
    nombre_edit: '',
    descripcion_edit: '',
    puntos_edit: '',
    foto_edit: null
  })

  const handleFileChangeEdit = (e) => {
    setEditarRecompensa({ ...editarRecompensa, foto_edit: e.target.files[0] })
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleInputChangeEdit = (e) => {
    setEditarRecompensa({ ...editarRecompensa, [e.target.name]: e.target.value })
  }

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('recompensa_nombre', editarRecompensa.nombre_edit);
    formData.append('recompensa_descripcion', editarRecompensa.descripcion_edit);
    formData.append('recomp_num_puntos', editarRecompensa.puntos_edit);

    if (editarRecompensa.foto_edit) {
      formData.append('foto', editarRecompensa.foto_edit);
    }

    try {
      const response = await axios.put(`${BACKEND_URL}/api/tienda/recompensas/actualizar/${id}`, formData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.message
        });
        const modalElement = document.getElementById('recompensaEditarModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        setImagePreview("");
        setIsDataUpdated(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al editar la recompensa',
        text: error.response.data.message
      });
    }
  }

  function openEditModal(recompensa) {
    setEditarRecompensa({
      id: recompensa.id_recomp,
      nombre_edit: recompensa.recompensa_nombre,
      descripcion_edit: recompensa.recompensa_descripcion,
      puntos_edit: recompensa.recomp_num_puntos,
      foto_edit: recompensa.recomp_foto
    });
  }

  //Eliminar recompensa
  const eliminarRecompensa = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de eliminar esta recompensa?',
        text: "No podrás revertir estaacción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      })
      if (!confirm.isConfirmed) {
        return;
      }

      const response = await axios.delete(`${BACKEND_URL}/api/tienda/recompensas/eliminar/${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: response.data.message
        });
        setIsDataUpdated(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la recompensa',
        text: error.response.data.message
      });
    }
  }

  return (
    <div className=''>
      <div className="d-flex justify-content-between">
        <h1>Recompensas</h1>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#añadirRecompensa"><i className="bi bi-plus"></i>Añadir</button>
      </div>

      {/* Modal para agregar recompensa */}

      <div className="modal fade" id="añadirRecompensa" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                    <img src={img} height={200} width={280} className='card-img-center border mb-4' alt="..." />
                    <input ref={fileInputRef} className='form-control' onChange={handleFileChange} type="file" accept='image/*' autoComplete='off' id='foto' name='foto' required />
                  </div>
                  <div className="col ms-3">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input type="text" name='nombre' onChange={handleInputChange} className="form-control my-2" placeholder="Nombre" value={recompensa.nombre} />
                    <label htmlFor="floatingInput">Puntos</label>
                    <input type="text" name='puntos' onChange={handleInputChange} className="form-control my-2" placeholder="Puntos" value={recompensa.puntos} />
                    <label htmlFor="floatingInput">Descripcion</label>
                    <textarea type="text" name='descripcion' onChange={handleInputChange} className="form-control my-2" placeholder="Descripción" id="floatingTextarea" value={recompensa.descripcion}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i></button>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}><i className="bi bi-check-circle"></i></button>
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
                <img src={`${recompensa.recomp_foto}`} height={200} className="card-img-top p-3" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{recompensa.recompensa_nombre}</h5>
                  <p className="card-text">{recompensa.recompensa_descripcion}</p>
                  <button type="button" className="btn btn-warning mx-4" data-bs-toggle="modal" data-bs-target="#recompensaEditarModal" onClick={() => openEditModal(recompensa)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" className="btn btn-danger mx-4" onClick={() => eliminarRecompensa(recompensa.id_recomp)}><i className="bi bi-trash"></i></button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="modal fade" id="recompensaEditarModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                    <img src={imagePreview ? imagePreview : `${editarRecompensa.foto_edit}`} className="img-fluid mb-3" alt="Imagen actual" height={100} />
                    <input onChange={handleFileChangeEdit} className='form-control' type="file" accept='image/*' id='foto' name='foto' />
                  </div>
                  <div className="col">
                    <label htmlFor="floatingInput">Nombre</label>
                    <input type="text" className="form-control my-2" name='nombre_edit' onChange={handleInputChangeEdit} value={editarRecompensa.nombre_edit} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"></input>

                    <label htmlFor="floatingInput">Puntos</label>
                    <input type="number" className="form-control my-2" name='puntos_edit' onChange={handleInputChangeEdit} value={editarRecompensa.puntos_edit} placeholder="Puntos" aria-label="Username" aria-describedby="basic-addon1" ></input>

                    <label htmlFor="floatingInput">Descripción</label>
                    <textarea className='form-control' name='descripcion_edit' onChange={handleInputChangeEdit} value={editarRecompensa.descripcion_edit} id="descripcion" placeholder='Inserte la descripcion' ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i></button>
              <button type="button" className="btn btn-success" onClick={() => { handleEdit(editarRecompensa.id) }}><i className="bi bi-check2-square"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
