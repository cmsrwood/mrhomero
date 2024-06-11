import React from 'react'
import img from '../../../public/img.png';

export default function Nosotros() {
  return (
    <div className='container p-5'> 
        <h1 className='text-center '>Nosotros</h1>
        <div className="row justify-content-between align-items-center">
                <div className="col-12 col-sm-8 order-last order-md-first">
                    <p className='pe-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facere praesentium laboriosam, cumque voluptatem distinctio similique reiciendis doloribus sapiente adipisci laudantium nulla porro assumenda, aliquam ratione minus, amet quam reprehenderit? Voluptate corporis blanditiis quidem sapiente consequatur voluptatem eveniet facilis error at, inventore maxime dolorum vero ullam tenetur assumenda reprehenderit iure laboriosam dolor illo, sunt corrupti modi, quos quas. Accusamus aliquid corporis deleniti corrupti cumque modi, beatae veniam non minus consequatur error minima ipsa autem amet voluptate delectus sunt consectetur. Totam eum ducimus dolorem modi, cumque sit ut impedit quae dicta et sed eveniet saepe nostrum deserunt voluptatibus consequatur a possimus.</p>
                </div>
                <div className="col-12 col-sm-4 bg-light rounded border border-5 border-warning">
                    <img src={img} className="img-fluid" alt="" />
                </div>
        </div>
            <div className="row justify-content-between align-items-center">
                <div className="col-12 col-sm-4 bg-light rounded border border-5 border-warning">
                    <img src={img} className="img-fluid" alt="" />
                </div>
                <div className="col-12 col-sm-8">
                    <p className='pe-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facere praesentium laboriosam, cumque voluptatem distinctio similique reiciendis doloribus sapiente adipisci laudantium nulla porro assumenda, aliquam ratione minus, amet quam reprehenderit? Voluptate corporis blanditiis quidem sapiente consequatur voluptatem eveniet facilis error at, inventore maxime dolorum vero ullam tenetur assumenda reprehenderit iure laboriosam dolor illo, sunt corrupti modi, quos quas. Accusamus aliquid corporis deleniti corrupti cumque modi, beatae veniam non minus consequatur error minima ipsa autem amet voluptate delectus sunt consectetur. Totam eum ducimus dolorem modi, cumque sit ut impedit quae dicta et sed eveniet saepe nostrum deserunt voluptatibus consequatur a possimus.</p>
                </div>
            </div>
    </div>
  )
}
