import React, { useState, useEffect } from 'react';
import { getInventory, addItem, updateItem, deleteItem } from '../services/api';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await getInventory(token!);
                setItems(response.data);
            } catch (error) {
                setMessage('Error al obtener el inventario');
            }
        };
        fetchInventory();
    }, [token]);

    const handleAddItem = async () => {
        try {
            await addItem({ name: newItem }, token!);
            setNewItem('');
            // Actualizar la lista de items
            const response = await getInventory(token!);
            setItems(response.data);
        } catch (error) {
            setMessage('Error al agregar el ítem');
        }
    };

    const handleUpdateItem = async (id: number) => {
        try {
            const updatedName = prompt('Nuevo nombre:');
            if (updatedName) {
                await updateItem(id, { name: updatedName }, token!);
                // Actualizar la lista de items
                const response = await getInventory(token!);
                setItems(response.data);
            }
        } catch (error) {
            setMessage('Error al actualizar el ítem');
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            await deleteItem(id, token!);
            // Actualizar la lista de items
            const response = await getInventory(token!);
            setItems(response.data);
        } catch (error) {
            setMessage('Error al eliminar el ítem');
        }
    };

    return (
        <div>
            <h2>Inventario</h2>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Nombre del ítem"
            />
            <button onClick={handleAddItem}>Agregar ítem</button>
            {message && <p>{message}</p>}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => handleUpdateItem(item.id)}>Actualizar</button>
                        <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
