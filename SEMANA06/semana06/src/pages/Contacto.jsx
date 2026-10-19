import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Paso 5: Formulario Controlado
const Contacto = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [enviado, setEnviado] = useState(false);
    const [ultimoMensaje, setUltimoMensaje] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        setUltimoMensaje({...formData, fecha: new Date().toLocaleString('es-ES')});
        setEnviado(true);
        setFormData({ nombre: '', email: '', mensaje: '' });
        setTimeout(() => setEnviado(false), 5000);
    };

    return (
        <div>
            <Navbar />
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
            <main id="main-content" style={{paddingTop: '100px', minHeight: '80vh', background: '#f9f9f9'}}>
                <section className="contacto" style={{padding: '50px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
                    <div style={{marginBottom: '15px'}}>
                        <span style={{background: '#ff6b35', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold'}}>Paso 5: Formulario Controlado</span>
                    </div>
                    <h2 style={{color: 'var(--main-color)', fontSize: '2.5rem', marginBottom: '10px'}}>Contáctanos</h2>
                    <p style={{marginBottom: '40px', color: '#666'}}>Llena este formulario. Sus inputs están controlados por el estado de React.</p>
                    
                    {enviado && (
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '30px',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                            animation: 'slideIn 0.5s ease-out'
                        }}>
                            <h3 style={{margin: '0 0 15px 0', fontSize: '1.5rem'}}>✅ ¡Mensaje Enviado Exitosamente!</h3>
                            {ultimoMensaje && (
                                <div style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    textAlign: 'left',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <p style={{margin: '8px 0'}}><strong>👤 Nombre:</strong> {ultimoMensaje.nombre}</p>
                                    <p style={{margin: '8px 0'}}><strong>📧 Email:</strong> {ultimoMensaje.email}</p>
                                    <p style={{margin: '8px 0'}}><strong>💬 Mensaje:</strong></p>
                                    <p style={{
                                        margin: '8px 0',
                                        padding: '10px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '5px',
                                        fontStyle: 'italic'
                                    }}>"{ultimoMensaje.mensaje}"</p>
                                    <p style={{margin: '8px 0 0 0', fontSize: '0.9rem', opacity: '0.9'}}>
                                        <strong>🕒 Fecha:</strong> {ultimoMensaje.fecha}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                        <div>
                            <label style={{display: 'block', marginBottom: '5px'}}>Nombre:</label>
                            <input 
                                type="text" 
                                name="nombre"
                                value={formData.nombre} 
                                onChange={handleChange}
                                required
                                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
                            />
                        </div>
                        <div>
                            <label style={{display: 'block', marginBottom: '5px'}}>Email:</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email} 
                                onChange={handleChange}
                                required
                                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
                            />
                        </div>
                        <div>
                            <label style={{display: 'block', marginBottom: '5px'}}>Mensaje:</label>
                            <textarea 
                                name="mensaje"
                                value={formData.mensaje} 
                                onChange={handleChange}
                                rows="4"
                                required
                                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-enviar" style={{padding: '15px', background: 'var(--main-color)', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>
                            Enviar Mensaje
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contacto;
