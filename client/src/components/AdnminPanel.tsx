import { useState } from 'react';
import EquipListAdmin from './EquipListAdmin';
import EquipForm from './EquipForm';

interface Equipment {
  id: string;
  name: string;
  location: string;
  status: string;
}

const AdminPanel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const handleEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsEditing(true);
  };

  return (
    <div className="bg-purple-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">Panel de Administración</h1>
        <EquipListAdmin onEdit={handleEdit} />
        {isEditing && (
          <EquipForm 
            equipment={selectedEquipment || undefined} 
            isEditing={true} 
            onSubmit={() => setIsEditing(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
