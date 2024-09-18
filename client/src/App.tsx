// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Inventory from '../src/pages/Inventory';
import Register from '../src/pages/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/inventory" element={<Inventory />} />
            </Routes>
        </Router>
    );
};

export default App;
