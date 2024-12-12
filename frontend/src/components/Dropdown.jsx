import React from 'react'

export default function Dropdown({ placeholder, icon, title, actions, actions2, actions3, actions4 }) {

    return (
        <div className="search-input position-relative d-flex">
            <div className="input-group">
                <input type="search" className="form-control form-control-lg ps-5" placeholder={placeholder} />
                <i className={`${icon} position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary`}></i>
                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="#">{actions}</a></li>
                    <li><a className="dropdown-item" href="#">{actions2}</a></li>
                    <li><a className="dropdown-item" href="#">{actions3}</a></li>
                    <li><a className="dropdown-item" href="#">{actions4}</a></li>
                    {/*<li><hr class="dropdown-divider" /></li>*/}
                </ul>
            </div>
        </div>
    )
}