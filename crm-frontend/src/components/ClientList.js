import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('authToken');
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

  const handleDelete = async (clientId) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tego klienta?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client._id !== clientId));
      alert('Klient został usunięty');
    } catch (error) {
      console.error('Błąd podczas usuwania klienta:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Lista Klientów</h1>
      {clients.length === 0 ? (
        <p>Ładowanie klientów...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Adres</th>
              <th>NIP</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.address}</td>
                <td>{client.nip}</td>
                <td>
                  <Link to={`/clients/${client._id}/actions`} className="btn btn-info btn-sm me-2">
                    Zobacz Akcje
                  </Link>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
