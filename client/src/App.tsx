import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from '../src/components/AdnminPanel';
import EquipmentList from '../src/components/EquipListAdmin'; // Página para ver equipos
import LoginForm from '../src/pages/Login';
import RegisterForm from '../src/pages/Register';
import { useAuth } from '../src/hooks/useAuth'; // Custom hook para autenticación

interface User {
  role: string;
}

const App = () => {
  const { user } = useAuth() as { user: User | null }; // Hook para obtener el usuario autenticado

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/equipos" element={<EquipmentList />} />
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/equipos" />}
        />
        <Route path="/" element={<Navigate to="/equipos" />} />
      </Routes>
    </Router>
  );
};

export default App;
