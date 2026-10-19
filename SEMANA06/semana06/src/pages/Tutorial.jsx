import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Step1 = () => (
    <div className="step-content">
        <div className="left-panel">
            <h2>1 Setup del Proyecto Vite + React</h2>
            <p>Configuración inicial con Vite, instalación de dependencias y estructura de carpetas SPA.</p>
            <div className="info-box">
                <h4>¿Qué hace este paso?</h4>
                <ul>
                    <li><strong>Vite</strong> es el bundler moderno que reemplaza a Create React App.</li>
                    <li><strong>react-router-dom</strong> permite navegación sin recargar la página.</li>
                    <li><strong>axios</strong> es el cliente HTTP para consumir APIs.</li>
                </ul>
            </div>
        </div>
        <div className="right-panel">
            <h3>Código JSX en Vivo</h3>
            <pre className="code-block">
{`// Paso 1: Setup Vite + React
$ npm create vite@latest my-app
$ cd my-app
$ npm install react-router-dom axios
$ npm run dev`}
            </pre>
        </div>
    </div>
);

const Step2 = () => (
    <div className="step-content">
        <div className="left-panel">
            <h2>2 Enrutamiento con React Router</h2>
            <p>Implementación de BrowserRouter, Routes, Route y NavLink para navegación SPA sin recargas.</p>
            <div className="info-box">
                <h4>Demo</h4>
                <p>Navega usando el menú superior del sitio o el enlace para volver a inicio.</p>
                <Link to="/" className="btn-cotizar" style={{display: 'inline-block', marginTop: '10px'}}>Volver al Inicio</Link>
            </div>
        </div>
        <div className="right-panel">
            <h3>Código JSX en Vivo</h3>
            <pre className="code-block">
{`// Paso 2: Enrutamiento
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  )
}`}
            </pre>
        </div>
    </div>
);

const Step3 = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(res.data.slice(0, 3));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="step-content">
            <div className="left-panel">
                <h2>3 Consumo de API con Axios + async/await</h2>
                <p>Fetch de datos desde jsonplaceholder con manejo de estados loading/data/error.</p>
                <button onClick={fetchUsers} className="btn-cotizar" style={{marginTop: '20px'}}>Cargar Usuarios</button>
                <div style={{marginTop: '20px'}}>
                    {loading && <p>Cargando...</p>}
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    {!loading && !error && users.length > 0 && (
                        <ul>
                            {users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}
                        </ul>
                    )}
                </div>
            </div>
            <div className="right-panel">
                <h3>Código JSX en Vivo</h3>
                <pre className="code-block">
{`// Paso 3: Consumo API
const fetchUsers = async () => {
    setLoading(true);
    try {
        const res = await axios.get('...');
        setUsers(res.data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};`}
                </pre>
            </div>
        </div>
    );
};

const Step4 = () => {
    const [status, setStatus] = useState("Esperando...");
    
    useEffect(() => {
        const controller = new AbortController();
        setStatus("Petición en progreso...");
        
        // Simulación de petición que puede ser abortada
        setTimeout(() => {
            if (!controller.signal.aborted) {
                setStatus("Petición completada.");
            }
        }, 2000);

        return () => {
            controller.abort();
            setStatus("Petición abortada (limpieza de useEffect).");
        };
    }, []);

    return (
        <div className="step-content">
            <div className="left-panel">
                <h2>4 Auditoría de la SPA (useEffect, AbortController)</h2>
                <p>Uso de useEffect para simular peticiones al montar el componente, controlando duplicados.</p>
                <div className="info-box" style={{marginTop: '20px'}}>
                    <p><strong>Estado de la simulación:</strong> {status}</p>
                </div>
            </div>
            <div className="right-panel">
                <h3>Código JSX en Vivo</h3>
                <pre className="code-block">
{`// Paso 4: useEffect AbortController
useEffect(() => {
  const controller = new AbortController();
  
  axios.get(url, { signal: controller.signal })
    .then(res => setData(res.data))
    .catch(err => {
      if(err.name === 'CanceledError') return;
      setError(err);
    });

  return () => controller.abort();
}, []);`}
                </pre>
            </div>
        </div>
    );
};

const Step5 = () => {
    const [tasks, setTasks] = useState(['Aprender React', 'Integrar Vite']);
    const [input, setInput] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if(input.trim()){
            setTasks([...tasks, input]);
            setInput('');
        }
    };

    return (
        <div className="step-content">
            <div className="left-panel">
                <h2>5 Renderizado Iterativo - Formulario Controlado</h2>
                <p>Formularios controlados con React y renderizado de listas con map.</p>
                <form onSubmit={addTask} style={{marginTop: '20px'}}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Nueva tarea"
                        style={{padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc'}}
                    />
                    <button type="submit" className="btn-cotizar" style={{padding: '10px'}}>Agregar</button>
                </form>
                <ul style={{marginTop: '20px'}}>
                    {tasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </div>
            <div className="right-panel">
                <h3>Código JSX en Vivo</h3>
                <pre className="code-block">
{`// Paso 5: Formulario Controlado
const [input, setInput] = useState('');
const addTask = (e) => {
  e.preventDefault();
  setTasks([...tasks, input]);
  setInput('');
};

return (
  <form onSubmit={addTask}>
    <input value={input} onChange={e => setInput(e.target.value)} />
  </form>
)`}
                </pre>
            </div>
        </div>
    );
};

const Tutorial = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        { id: 1, label: 'Setup Vite' },
        { id: 2, label: 'Enrutamiento' },
        { id: 3, label: 'Consumo API' },
        { id: 4, label: 'Auditoría' },
        { id: 5, label: 'Formulario' }
    ];

    const renderStep = () => {
        switch(activeStep) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <Step4 />;
            case 5: return <Step5 />;
            default: return <Step1 />;
        }
    };

    return (
        <div style={{minHeight: '100%', background: '#f5f7f9', padding: '20px', fontFamily: 'sans-serif'}}>
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                <h1 style={{marginBottom: '20px', color: '#333'}}>Tutorial React</h1>
                
                <div className="steps-buttons" style={{display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap'}}>
                    {steps.map(s => (
                        <button 
                            key={s.id} 
                            onClick={() => setActiveStep(s.id)}
                            style={{
                                padding: '10px 20px',
                                background: activeStep === s.id ? '#ff6b35' : '#fff',
                                color: activeStep === s.id ? '#fff' : '#333',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Paso {s.id}: {s.label}
                        </button>
                    ))}
                </div>

                <div className="tutorial-container" style={{background: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
                    {renderStep()}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .step-content {
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .step-content {
                        flex-direction: row;
                    }
                }
                .left-panel {
                    flex: 1;
                    padding: 30px;
                }
                .right-panel {
                    flex: 1;
                    background: #1e1e1e;
                    color: #d4d4d4;
                    padding: 30px;
                }
                .info-box {
                    background: #f0f7ff;
                    border-left: 4px solid #007bff;
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 0 4px 4px 0;
                }
                .code-block {
                    background: #2d2d2d;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                    font-family: monospace;
                    margin-top: 15px;
                }
                .btn-cotizar {
                    background: #ff6b35;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .btn-cotizar:hover {
                    background: #e55a29;
                }
            `}} />
        </div>
    );
};

export default Tutorial;
