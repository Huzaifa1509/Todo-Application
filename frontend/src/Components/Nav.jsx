import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">fgdfgfd</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* <li className="nav-item">
                            <Link to="/" className="nav-link">Product List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">All Users</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register User</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/login" className="nav-link">Login User</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
