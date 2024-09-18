import { useState } from 'react';
import { registerUser } from '../services/api';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Asegúrate de tener role aquí

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registerUser(email, password, role);
            console.log(response)
            
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
