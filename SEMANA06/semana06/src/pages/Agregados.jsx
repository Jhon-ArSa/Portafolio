import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Paso 5: Renderizado Iterativo - Aquí usamos map para renderizar una lista de datos (Agregados)
const Agregados = () => {
    const materiales = [
        { id: 1, nombre: 'Arena Gruesa', descripcion: 'Arena ideal para asentar ladrillos.', icono: 'ri-landscape-fill' },
        { id: 2, nombre: 'Piedra Chancada', descripcion: 'Piedra para concreto de alta resistencia.', icono: 'ri-building-4-fill' },
        { id: 3, nombre: 'Confitillo', descripcion: 'Para acabados finos y afirmado.', icono: 'ri-route-fill' },
        { id: 4, nombre: 'Hormigón', descripcion: 'Mezcla lista para zapatas y cimientos.', icono: 'ri-tools-fill' }
    ];

    return (
        <div>
            <Navbar />
            <main id="main-content" style={{paddingTop: '100px', minHeight: '80vh'}}>
                <section className="agregados">
                    <div style={{textAlign: 'center', marginBottom: '15px'}}>
                        <span style={{background: '#ff6b35', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold'}}>Paso 5: Renderizado Iterativo (.map)</span>
                    </div>
                    <h2 className="agregados-titulo">Nuestros Agregados</h2>
                    <p className="agregados-descripcion">Esta sección aplica el renderizado iterativo generando las tarjetas a partir de un arreglo de datos.</p>
                    
                    <div className="agregados-contenedor">
                        {materiales.map(mat => (
                            <div key={mat.id} className="agregado-card">
                                <div className="agregado-imagen" style={{background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', color:'#ff6b35', fontSize:'4rem'}}>
                                    <i className={mat.icono}></i>
                                </div>
                                <div className="agregado-info">
                                    <h3>{mat.nombre}</h3>
                                    <p>{mat.descripcion}</p>
                                    <button className="agregado-boton">Pedir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Agregados;
