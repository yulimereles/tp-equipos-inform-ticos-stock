import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            if (response.status === 200) {
                const data = await response.data;
                localStorage.setItem('token', data.token);
                setMessage('Inicio de sesión exitoso');
                // Redirige a la página principal o al inventario
                // window.location.href = '/inventory'; // Ajusta según tu ruta
            } else {
                setMessage('Error al iniciar sesión');
            }
        } catch (error) {
            setMessage('Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesion</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
