import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);

    // Cancelar la petición anterior si hay una en curso
    const abortPrevious = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    const simularLoading = () => {
        abortPrevious();
        setLoading(true);
        setError(null);
        setNoticias([]);
        // Simplemente se queda cargando, no hace fetch
    };

    const simularExito = async () => {
        abortPrevious();
        setLoading(true);
        setError(null);
        setNoticias([]);
        
        try {
            // Simulamos un retraso de 1 segundo para apreciar el loading
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3', {
                signal: controllerRef.current.signal
            });
            setNoticias(res.data);
        } catch (err) {
            if (err.name === 'CanceledError') return;
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const simularError = async () => {
        abortPrevious();
        setLoading(true);
        setError(null);
        setNoticias([]);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Hacemos una petición a una URL falsa para generar un error 404
            await axios.get('https://jsonplaceholder.typicode.com/ruta-falsa-que-no-existe', {
                signal: controllerRef.current.signal
            });
        } catch (err) {
            if (err.name === 'CanceledError') return;
            setError("Error al cargar: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <main id="main-content" style={{paddingTop: '100px', minHeight: '80vh', background: '#fff'}}>
                <section className="noticias" id="noticias" style={{padding: '50px 20px', maxWidth: '1200px', margin: '0 auto'}}>
                    <div className="noticias-header" style={{textAlign: 'center', marginBottom: '40px'}}>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '15px'}}>
                            <span style={{background: '#ff6b35', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold'}}>Paso 3: Consumo de API (Axios)</span>
                            <span style={{background: '#007bff', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold'}}>Paso 4: Auditoría (useEffect/AbortController)</span>
                        </div>
                        <h2 style={{color: 'var(--main-color)', fontSize: '2.5rem'}}>Noticias Recientes</h2>
                        <p>Interactúa con los botones para simular los estados de una petición HTTP.</p>
                    </div>
                    
                    {/* Botones de simulación de API */}
                    <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap'}}>
                        <button onClick={simularLoading} style={{background: '#0ea5e9', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>
                            Simular Loading
                        </button>
                        <button onClick={simularExito} style={{background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>
                            Simular Éxito
                        </button>
                        <button onClick={simularError} style={{background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>
                            Simular Error
                        </button>
                    </div>

                    {/* Estados Visuales */}
                    {loading && (
                        <div style={{textAlign: 'center', padding: '40px'}}>
                            <i className="ri-loader-4-line" style={{fontSize: '3rem', color: 'var(--main-color)', animation: 'spin 1s linear infinite', display: 'inline-block'}}></i>
                            <p style={{marginTop: '15px', color: '#666'}}>Cargando noticias desde API...</p>
                            <p style={{fontSize: '0.8rem', color: '#999'}}>GET https://jsonplaceholder.typicode.com/posts</p>
                        </div>
                    )}
                    
                    {error && (
                        <div style={{textAlign: 'center', padding: '40px', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', maxWidth: '600px', margin: '0 auto'}}>
                            <i className="ri-error-warning-fill" style={{fontSize: '2rem'}}></i>
                            <p style={{marginTop: '10px', fontWeight: 'bold'}}>{error}</p>
                        </div>
                    )}
                    
                    <div className="noticias-contenedor" style={{display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {!loading && !error && noticias.map(n => (
                            <div key={n.id} className="noticia-card" style={{border: '1px solid #eee', borderRadius: '10px', padding: '20px', width: '300px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                                <h3 style={{marginBottom: '10px', color: '#333'}}>{n.title}</h3>
                                <p style={{color: '#666'}}>{n.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}} />
            </main>
            <Footer />
        </div>
    );
};

export default Noticias;
