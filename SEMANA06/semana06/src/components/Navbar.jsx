import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <NavLink to="/" className="logo">
                    <i className="ri-home-5-fill"></i> <span> Agregados</span>
                </NavLink>
                <span style={{background: '#ff6b35', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', marginTop: '5px'}}>Paso 2: React Router (SPA)</span>
            </div>

            <ul className="navbar" role="navigation" aria-label="Menú principal">
                <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink></li>
                <li><NavLink to="/agregados" className={({isActive}) => isActive ? 'active' : ''}>Agregados</NavLink></li>
                <li><NavLink to="/servicios" className={({isActive}) => isActive ? 'active' : ''}>Servicios</NavLink></li>
                <li><NavLink to="/noticias" className={({isActive}) => isActive ? 'active' : ''}>Noticias (API)</NavLink></li>
                <li><NavLink to="/contacto" className={({isActive}) => isActive ? 'active' : ''}>Contacto</NavLink></li>
            </ul>

            <div className="main">
                <NavLink to="/contacto" className="user">
                    <i className="ri-arrow-right-down-box-fill"></i> Cotizar
                </NavLink>
                <div className="bx bx-menu" id="menu-icon"></div>
            </div>
        </header>
    );
};

export default Navbar;
