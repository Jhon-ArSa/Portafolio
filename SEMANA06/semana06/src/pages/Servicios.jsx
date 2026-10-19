import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Servicios = () => {
    return (
        <div>
            <Navbar />
            <main id="main-content" style={{paddingTop: '100px', minHeight: '80vh'}}>
                <section className="servicios">
                    <div className="servicios-header">
                        <h2>Nuestros Servicios</h2>
                        <p>Brindamos soluciones integrales en agregados, transporte y logística para la construcción.</p>
                    </div>
                    <div className="servicios-contenedor">
                        <div className="servicio-card">
                            <i className="ri-truck-fill"></i>
                            <h3>Venta de Agregados</h3>
                            <p>Venta de arena, piedra, confitillo y material chancado de alta calidad.</p>
                        </div>
                        <div className="servicio-card">
                            <i className="ri-road-map-fill"></i>
                            <h3>Transporte de Materiales</h3>
                            <p>Traslado seguro y puntual de materiales directamente a tu obra.</p>
                        </div>
                        <div className="servicio-card">
                            <i className="ri-delete-bin-6-fill"></i>
                            <h3>Desalojo de Desmonte</h3>
                            <p>Retiro eficiente de desmonte y residuos de obra cumpliendo normas.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Servicios;
