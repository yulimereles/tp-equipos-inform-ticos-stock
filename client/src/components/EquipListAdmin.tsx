import { useState, useEffect } from 'react';
import { getInventory } from '../services/api'; // Funciones HTTP

interface Equipment {
  id: number;
  name: string;
  location: string;
  status: string;
}

const EquipmentList = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const token = 'your-auth-token'; // Replace with actual token

  useEffect(() => {
    async function fetchEquipments() {
      const response = await getInventory(token); 
      setEquipments(response.data); 
    }
    fetchEquipments();
  }, []);

  return (
    <div className="bg-purple-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">Lista de Equipos</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-purple-300 px-4 py-2 text-left">Nombre</th>
                <th className="border-b-2 border-purple-300 px-4 py-2 text-left">Ubicación</th>
                <th className="border-b-2 border-purple-300 px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equip) => (
                <tr key={equip.id} className="border-b">
                  <td className="px-4 py-2">{equip.name}</td>
                  <td className="px-4 py-2">{equip.location}</td>
                  <td className="px-4 py-2">{equip.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentList;
