// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Utiliza el proxy de Vite

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
};

export const registerUser = async (email: string, password: string, role: string) => {
    return api.post('/auth/register', { email, password, role });
};

export const getInventory = async (token: string) => {
    return api.get('/inventory', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addItem = async (item: any, token: string) => {
    return api.post('/inventory', item, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateItem = async (id: number, item: any, token: string) => {
    return api.put(`/inventory/${id}`, item, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteItem = async (id: number, token: string) => {
    return api.delete(`/inventory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
