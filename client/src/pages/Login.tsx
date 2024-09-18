import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Para redireccionar después del login

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            
            // Verifica la respuesta
            // console.log(response.data); // Esto te ayudará a ver cómo es la respuesta
            
            if (response.status === 200) {
                const data = response.data;


                // Verifica si 'data' tiene el usuario y el rol
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setMessage('Inicio de sesión exitoso');

                    // Redirecciona basado en el rol
                    // if (data.user.role === 'admin') {
                    //     navigate('/admin'); // Redirige al panel de admin si es admin
                    // } else {
                        navigate('/equipos'); // Redirige a la lista de equipos si es usuario normal
                    // }
                } else {
                    setMessage('Usuario o rol no encontrado en la respuesta');
                }
            } else {
                setMessage('Error al iniciar sesión');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error al iniciar sesión');
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    💜Inicia sesión en FORMOTEX💜
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
