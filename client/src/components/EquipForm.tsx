import { useState, FormEvent } from 'react';
import { addItem, updateItem } from '../services/api'; 

interface EquipFormProps {
  equipment?: {
    id: number;
    name: string;
    location: string;
    status: string;
  };
  isEditing: boolean;
  onSubmit: () => void;
}

const EquipForm = ({ equipment, isEditing, onSubmit }: EquipFormProps) => {
  const [name, setName] = useState(equipment ? equipment.name : '');
  const [location, setLocation] = useState(equipment ? equipment.location : '');
  const [status, setStatus] = useState(equipment ? equipment.status : '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const equipmentData = { name, location, status };

    if (isEditing) {
      await updateItem(equipment.id, equipmentData, 'your-token-here');
    } else {
      await addItem(equipmentData, 'your-token-here');
    }
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">{isEditing ? 'Editar' : 'Agregar'} Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Equipo</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ubicación</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button 
          type="submit" 
          className={`bg-green-500 text-white px-4 py-2 rounded ${isEditing ? 'hover:bg-green-600' : 'hover:bg-green-700'}`}
        >
          {isEditing ? 'Actualizar' : 'Agregar'} Equipo
        </button>
      </form>
    </div>
  );
};

export default EquipForm;
