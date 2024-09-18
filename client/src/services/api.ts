// src/services/api.ts
import axios from 'axios';

// URL base de la API (utiliza proxy de Vite o el backend en producción)
const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función genérica para manejo de errores
const handleRequest = async <T>(request: () => Promise<T>) => {
    try {
        const response = await request();
        return response; // Retorna solo los datos
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; // Re-lanza el error para manejarlo en el componente
    }
};

// Autenticación
export const loginUser = async (email: string, password: string) => {
    return handleRequest(() => api.post('/auth/login', { email, password }));
};

export const registerUser = async (email: string, password: string, role: string) => {
    return handleRequest(() => api.post('/auth/register', { email, password, role }));
};

// Inventario
export const getInventory = async (token: string) => {
    return handleRequest(() =>
        api.get('/api/equipos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
};

interface Item {
    // Define the structure of your item here
    name: string;
    quantity: number;
    // Add other fields as necessary
}

export const addItem = async (item: Item, token: string) => {
    return handleRequest(() =>
        api.post('/api/equipos', item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
};

export const updateItem = async (id: number, item: Item, token: string) => {
    return handleRequest(() =>
        api.put(`/api/equipos/${id}`, item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
};

export const deleteItem = async (id: number, token: string) => {
    return handleRequest(() =>
        api.delete(`/inventory/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
};
