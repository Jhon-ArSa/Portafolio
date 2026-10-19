import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />

            <a className="skip-link" href="#main-content">Saltar al contenido</a>

            <main id="main-content">
                <section id="inicio" className="home" aria-label="Sección de inicio">
                    {/* El video está comentado porque podría no cargar en dev sin public/ */}
                    <video autoPlay muted loop id="video-bg">
                        <source src="video-home.mp4/video-home.mp4" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                    <div className="home-content">
                        <div style={{ background: '#ff6b35', color: '#fff', display: 'inline-block', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Paso 1: Setup Vite + React (App Completa)
                        </div>
                        <img src="/img/logo02.png" alt="Logo de Agregados" className="home-logo" />
                        <h1>Bienvenido a Agregados</h1>
                        <p>Ofrecemos los mejores materiales para tus proyectos de construcción.</p>
                        <Link to="/contacto" className="btn-cotizar">Cotizar ahora</Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
