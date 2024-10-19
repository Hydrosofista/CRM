import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Brak tokenu autoryzacyjnego, użytkownik niezalogowany.');
        return;
      }
  
      try {
        const response = await axios.get('/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setClients(response.data);
      } catch (error) {
        console.error('Błąd:', error.response?.data || error.message);
      }
    };
  
    fetchClients();
  }, []);
  

  return (
    <div>
      <h1>Lista Klientów</h1>
      {clients.length === 0 ? (
        <p>Ładowanie klientów...</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client._id}>
              <strong>{client.name}</strong> - {client.address} (NIP: {client.nip})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientList;
