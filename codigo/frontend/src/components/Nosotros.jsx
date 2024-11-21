import React from 'react'
import img from '../../public/logo.png'
import banner from '../assets/img/banner-nosotros.jpg'
import homero from '../assets/img/homero.jpg'
import '../styles/style.css'


export default function Nosotros() {
    return (    
        <div className="">
            <div className="container">
                <div className="row d-flex justify-content-center mb-5 ps-5">
                    <div className="col-8  fw-bold d-block align-content-center ">
                        <h2>SI LO QUE BUSCAS ES SABOR </h2>
                        <h2><span className='homero'>MR. HOMERO</span> ES LO MEJOR.</h2>
                    </div>
                    <div className="col-4 text-center">
                        <img src={img} width={250} height={250} />
                    </div>
                </div>
                <div className="border-bottom border-top border-2 py-5">
                    <div className="d-flex justify-content-center pb-5">
                        <img src={banner} className='border border-2 rounded shadow-lg' width={800} height={350} />
                    </div>
                    <div className="d-flex row align-items-center mx-5">
                        <div className="col-8">
                            <h5>SOBRE <span className='homero fs-4' > MR.HOMERO</span></h5>
                            <p className='scrollbar-nosotros w-75'> Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.
                                Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.
                                Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.
                                Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.
                                Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.
                            </p>
                        </div>
                        <div className="col-4">
                            <img src={homero} alt="" width={470} height={250} className='border border-2 rounded shadow-lg nosotros-img' style={{ float: 'right' }} />
                        </div>
                    </div>

                    <div className="d-flex row align-items-center mx-5 py-5">
                        <div className="col-8">
                            <h5>METAS <span className='homero fs-4' > MR.HOMERO</span></h5>
                            <p className='scrollbar-nosotros w-75'> Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.</p>
                        </div>
                        <div className="col-4">
                            <img src={homero} alt="" width={470} height={250} className='border border-2 rounded shadow-lg nosotros-img' style={{ float: 'right' }} />
                        </div>
                    </div>

                    <div className="d-flex row align-items-center mx-5">
                        <div className="col-8">
                            <h5>COMIDA <span className='homero fs-4' > MR.HOMERO</span></h5>
                            <p className='scrollbar-nosotros w-75'> Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.</p>
                        </div>
                        <div className="col-4">
                            <img src={homero} alt="" width={470} height={250} className='border border-2 rounded shadow-lg nosotros-img' style={{ float: 'right' }} />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
