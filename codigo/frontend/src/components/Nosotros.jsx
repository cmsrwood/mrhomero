import React from 'react'
import img from '../assets/img/img.png'
import homero from '../assets/img/homero.jpg'

export default function Nosotros() {
    return (
        <div className="">
            <div className="container">
                <div className="row d-flex justify-content-center mb-5 ps-5">
                    <div className="col-8  fw-bold d-block align-content-center ">
                        <h2>SI LO QUE BUSCAS ES SABOR </h2>
                        <h2><span className='homero'>MR. HOMERO</span> ES LO MEJOR.</h2>
                    </div>
                    <div className="col-4  ps-4 text-center">
                        <img src={img} width={250} height={250} />
                    </div>
                </div>
                <div className="">
                    <div className="border-bottom border-top border-2 p-5">
                        <h5>SOBRE <span className='homero fs-4' > MR.HOMERO</span></h5>
                        <p className='w-25'> Lorem ipsum d align-content-centerolor sit amet consectetur adipisicing elit. Esse et aliquam recusandae labore doloribus, incidunt, aspernatur inventore tenetur amet quisquam, ab delectus. Sint quod, esse accusantium natus mollitia qui eos.</p>
                    </div>
                    <div className="pt-3">
                        <img src={homero} alt="" widyh={500} height={500}className='border border-2 rounded shadow-lg' />
                    </div>
                </div>

            </div>
        </div>
    )
}
