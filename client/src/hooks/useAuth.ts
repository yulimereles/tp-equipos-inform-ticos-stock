import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const loggedUser = JSON.parse(storedUser);
          setUser(loggedUser);
        } else {
          setUser(null); // No hay usuario autenticado
        }
      } catch (err) {
        console.error('Error al obtener los datos del usuario', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
