import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClientActionsPage = () => {
  const { id } = useParams(); // ID klienta
  const [actions, setActions] = useState([]);
  const [contactDate, setContactDate] = useState('');
  const [actionType, setActionType] = useState('');
  const [description, setDescription] = useState('');

  // Funkcja do pobierania akcji klienta
const fetchActions = useCallback(async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`/api/actions/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActions(response.data);
  } catch (error) {
    console.error('Błąd podczas pobierania akcji klienta:', error.response?.data || error.message);
  }
}, [id]);

useEffect(() => {
  fetchActions();
}, [fetchActions]);


  const handleAddAction = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        `/api/actions/client/${id}`,
        { contactDate, actionType, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Akcja została dodana!');
      setContactDate('');
      setActionType('');
      setDescription('');
      // Pobierz akcje ponownie, aby zaktualizować tabelę
      fetchActions();
    } catch (error) {
      console.error('Błąd podczas dodawania akcji:', error.response?.data || error.message);
    }
  };

  const handleDeleteAction = async (actionId) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę akcję?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/actions/${actionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActions(actions.filter((action) => action._id !== actionId));
      alert('Akcja została usunięta');
    } catch (error) {
      console.error('Błąd podczas usuwania akcji:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Akcje Klienta</h1>
      <form onSubmit={handleAddAction}>
        <div className="mb-3">
          <label className="form-label">Data Kontaktu:</label>
          <input
            type="date"
            className="form-control"
            value={contactDate}
            onChange={(e) => setContactDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Typ Akcji:</label>
          <select
            className="form-select"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            required
          >
            <option value="">Wybierz...</option>
            <option value="Telefon">Telefon</option>
            <option value="Spotkanie">Spotkanie</option>
            <option value="Inne">Inne</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Opis:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Dodaj Akcję</button>
      </form>

      <h2 className="mt-4">Lista Akcji</h2>
      {actions.length === 0 ? (
        <p>Brak akcji dla tego klienta.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Data Kontaktu</th>
              <th>Typ Akcji</th>
              <th>Opis</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action._id}>
                <td>{new Date(action.contactDate).toLocaleDateString()}</td>
                <td>{action.actionType}</td>
                <td>{action.description}</td>
                <td>
                  <button
                    onClick={() => handleDeleteAction(action._id)}
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

export default ClientActionsPage;