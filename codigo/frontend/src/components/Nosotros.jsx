import React from 'react'
import img from '../assets/img/img.png'

export default function Nosotros() {
    return (
        <div className="">
            <h1 className="centro">Nosotros</h1>
            <div className="container-flex">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tenetur doloremque pariatur sed modi repellat cumque vel perferendis accusantium, fuga maiores iusto veritatis voluptas magni placeat minima unde ullam temporibus quidem nemo dolorum numquam maxime. Amet tempora nam rerum inventore? Incidunt, cupiditate. Laboriosam, animi asperiores illum, earum soluta quod labore aperiam voluptatibus perspiciatis at ducimus dicta, neque beatae doloribus eligendi quis corrupti deserunt excepturi? Mollitia modi odit quo enim maiores deserunt, cupiditate nisi animi, ipsum amet dignissimos provident incidunt minima qui? Deserunt, dolorem mollitia deleniti alias nobis ipsa exercitationem quam dolores quasi temporibus sint, delectus quia ullam. Fugiat, earum reprehenderit.</p>
                <img src={img} className="foto-nosotros" alt="..." />
            </div>
            <div className="container-flex">
                <img src={img} className="foto-nosotros" alt="..." />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tenetur doloremque pariatur sed modi repellat cumque vel perferendis accusantium, fuga maiores iusto veritatis voluptas magni placeat minima unde ullam temporibus quidem nemo dolorum numquam maxime. Amet tempora nam rerum inventore? Incidunt, cupiditate. Laboriosam, animi asperiores illum, earum soluta quod labore aperiam voluptatibus perspiciatis at ducimus dicta, neque beatae doloribus eligendi quis corrupti deserunt excepturi? Mollitia modi odit quo enim maiores deserunt, cupiditate nisi animi, ipsum amet dignissimos provident incidunt minima qui? Deserunt, dolorem mollitia deleniti alias nobis ipsa exercitationem quam dolores quasi temporibus sint, delectus quia ullam. Fugiat, earum reprehenderit.</p>
            </div>
        </div>
    )
}
