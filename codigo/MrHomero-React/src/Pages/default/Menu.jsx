// eslint-disable-next-line no-unused-vars
import React from 'react'
import ScrollToTop from 'react-scroll-to-top';

export default function Menu() {

    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-example'
      })

    function cards(times) {
        const cards = [];
        for (let i = 0; i < times; i++) {
            cards.push(
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            );
        }
        return cards;
    }
    return (
        <div className="container">
            <h1 className="text-warning text-center p-2">Menu</h1>
            <div className="row">
                <div className="col-4">
                    <div id="list-example" className="list-group">
                        <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
                    </div>
                </div>
                <div className="col-8">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example scrollable-container" tabindex="0">
                        <h4>Item 1</h4>
                        <p  id="list-item-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente eos officiis accusantium perferendis esse iste necessitatibus aut blanditiis odio id similique praesentium nisi, natus quo sed molestiae illum, ipsam quisquam vitae maxime temporibus ab et nesciunt modi? Earum itaque asperiores, quas accusantium quisquam quo facilis necessitatibus hic repellendus voluptatem, sit ipsa veritatis tempore modi non architecto. Modi voluptatibus quasi minima debitis! Cupiditate amet, expedita magni praesentium adipisci magnam repellat laborum tempora maxime autem obcaecati iure accusantium architecto suscipit pariatur iusto esse, laboriosam aspernatur voluptas eum recusandae consectetur totam voluptates? At dolorum iusto repudiandae aspernatur odio repellat nobis ipsa nulla, quia officia explicabo id impedit iste vero beatae facere doloribus maiores eum sapiente eveniet eos ducimus! Maxime magni qui neque doloribus consectetur perferendis, odit eveniet repellendus quis expedita sequi officia, voluptates dolores ipsum autem. Debitis adipisci officia earum, error dolor veniam. Eligendi veniam totam iure saepe facilis beatae, impedit aut? Dolorem fugiat tempora velit. Impedit et fugit repellat dolorem asperiores odio vero repellendus explicabo tenetur, fugiat cum ducimus magni aliquam alias enim temporibus voluptate nihil architecto quam totam. Aperiam eveniet debitis quaerat id perspiciatis dignissimos perferendis es.</p>
                        <h4 >Item 2</h4>
                        <p id="list-item-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente eos officiis accusantium perferendis esse iste necessitatibus aut blanditiis odio id similique praesentium nisi, natus quo sed molestiae illum, ipsam quisquam vitae maxime temporibus ab et nesciunt modi? Earum itaque asperiores, quas accusantium quisquam quo facilis necessitatibus hic repellendus voluptatem, sit ipsa veritatis tempore modi non architecto. Modi voluptatibus quasi minima debitis! Cupiditate amet, expedita magni praesentium adipisci magnam repellat laborum tempora maxime autem obcaecati iure accusantium architecto suscipit pariatur iusto esse, laboriosam aspernatur voluptas eum recusandae consectetur totam voluptates? At dolorum iusto repudiandae aspernatur odio repellat nobis ipsa nulla, quia officia explicabo id impedit iste vero beatae facere doloribus maiores eum sapiente eveniet eos ducimus! Maxime magni qui neque doloribus consectetur perferendis, odit eveniet repellendus quis expedita sequi officia, voluptates dolores ipsum autem. Debitis adipisci officia earum, error dolor veniam. Eligendi veniam totam iure saepe facilis beatae, impedit aut? Dolorem fugiat tempora velit. Impedit et fugit repellat dolorem asperiores odio vero repellendus explicabo tenetur, fugiat cum ducimus magni aliquam alias enim temporibus voluptate nihil architecto quam totam. Aperiam eveniet debitis quaerat id perspiciatis dignissimos perferendis es.</p>
                        <h4>Item 3</h4>
                        <p  id="list-item-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente eos officiis accusantium perferendis esse iste necessitatibus aut blanditiis odio id similique praesentium nisi, natus quo sed molestiae illum, ipsam quisquam vitae maxime temporibus ab et nesciunt modi? Earum itaque asperiores, quas accusantium quisquam quo facilis necessitatibus hic repellendus voluptatem, sit ipsa veritatis tempore modi non architecto. Modi voluptatibus quasi minima debitis! Cupiditate amet, expedita magni praesentium adipisci magnam repellat laborum tempora maxime autem obcaecati iure accusantium architecto suscipit pariatur iusto esse, laboriosam aspernatur voluptas eum recusandae consectetur totam voluptates? At dolorum iusto repudiandae aspernatur odio repellat nobis ipsa nulla, quia officia explicabo id impedit iste vero beatae facere doloribus maiores eum sapiente eveniet eos ducimus! Maxime magni qui neque doloribus consectetur perferendis, odit eveniet repellendus quis expedita sequi officia, voluptates dolores ipsum autem. Debitis adipisci officia earum, error dolor veniam. Eligendi veniam totam iure saepe facilis beatae, impedit aut? Dolorem fugiat tempora velit. Impedit et fugit repellat dolorem asperiores odio vero repellendus explicabo tenetur, fugiat cum ducimus magni aliquam alias enim temporibus voluptate nihil architecto quam totam. Aperiam eveniet debitis quaerat id perspiciatis dignissimos perferendis es.</p>
                        <h4>Item 4</h4>
                        <p id="list-item-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente eos officiis accusantium perferendis esse iste necessitatibus aut blanditiis odio id similique praesentium nisi, natus quo sed molestiae illum, ipsam quisquam vitae maxime temporibus ab et nesciunt modi? Earum itaque asperiores, quas accusantium quisquam quo facilis necessitatibus hic repellendus voluptatem, sit ipsa veritatis tempore modi non architecto. Modi voluptatibus quasi minima debitis! Cupiditate amet, expedita magni praesentium adipisci magnam repellat laborum tempora maxime autem obcaecati iure accusantium architecto suscipit pariatur iusto esse, laboriosam aspernatur voluptas eum recusandae consectetur totam voluptates? At dolorum iusto repudiandae aspernatur odio repellat nobis ipsa nulla, quia officia explicabo id impedit iste vero beatae facere doloribus maiores eum sapiente eveniet eos ducimus! Maxime magni qui neque doloribus consectetur perferendis, odit eveniet repellendus quis expedita sequi officia, voluptates dolores ipsum autem. Debitis adipisci officia earum, error dolor veniam. Eligendi veniam totam iure saepe facilis beatae, impedit aut? Dolorem fugiat tempora velit. Impedit et fugit repellat dolorem asperiores odio vero repellendus explicabo tenetur, fugiat cum ducimus magni aliquam alias enim temporibus voluptate nihil architecto quam totam. Aperiam eveniet debitis quaerat id perspiciatis dignissimos perferendis es.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}