import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-contenedor">
                <div className="footer-columna">
                    <Link to="/" className="footer-logo">
                        <i className="ri-home-5-fill"></i> <span>Agregados</span>
                    </Link>
                    <p className="footer-descripcion">Ofrecemos los mejores materiales para tus proyectos de construcción. Calidad y confiabilidad garantizada.</p>
                </div>
                <div className="footer-columna">
                    <h3 className="footer-titulo">Enlaces Rápidos</h3>
                    <ul className="footer-enlaces">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/agregados">Agregados</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/noticias">Noticias</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className="footer-columna">
                    <h3 className="footer-titulo">Contacto</h3>
                    <ul className="footer-contacto">
                        <li><i className="ri-map-pin-fill"></i> Av. Arica #216, Huancayo Pilcomayo, Perú</li>
                        <li><i className="ri-phone-fill"></i> <a href="tel:+51964636092">+51 964 636 092</a></li>
                        <li><i className="ri-mail-fill"></i> <a href="mailto:jhonyaroni650@gmail.com">jhonyaroni650@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-derechos">
                <p>&copy; <span id="anio">{new Date().getFullYear()}</span> Agregados. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
