import * as React from 'react'
import { navigate } from 'gatsby'
import '../styles/fa/css/all.css'
import '../styles/bootstrap.min.css'
import { isloggedin, logout } from './auth'

const NavBar = ({children}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Doodle</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                    <a className="nav-link" href="/">Home
                        <span className="visually-hidden">(current)</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/poll-list">Poll List</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/log-in"onClick={event=>{if(isloggedin()){event.preventDefault();logout(()=>setTimeout(() => navigate('/log-in'), 50))}}}>{isloggedin()?"Sign Out":"Sign In"}</a>
                    </li>
                </ul>
                
                </div>
            </div>
            </nav>
    )
}

export default NavBar