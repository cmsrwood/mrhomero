export default function menu() {
    return (
        <div className="container">
            <h1 className="text-warning text-center p-2">Menu</h1>
            <div className="">
                <div className="row justify-content-between">
                    <span className=" col text-warning fs-4">Categoria</span>
                    <button className="col-1 btn btn-warning ">Ver todo</button>
                </div>
            </div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row">
                            <div className="card col">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                </div>
                            </div>
                            <div className="card col">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                </div>
                            </div>
                            <div className="card col">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                </div>
                            </div>
                            <div className="card col">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="carousel-item">
                        <div className="card">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                            </div>
                        </div>
                        <div className="carousel-item">

                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}