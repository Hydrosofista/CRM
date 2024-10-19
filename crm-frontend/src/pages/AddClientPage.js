import React, { useState } from 'react';
import axios from 'axios';

const AddClientPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nip, setNip] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pobierz token JWT z localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Nie jesteś zalogowany.');
      }

      // Wyślij dane do serwera
      const response = await axios.post(
        '/api/clients',
        { name, address, nip },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Po pomyślnym dodaniu klienta pokaż komunikat o sukcesie
      if (response.status === 201) {
        alert('Klient został dodany!');
        // Wyczyść formularz po dodaniu klienta
        setName('');
        setAddress('');
        setNip('');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania klienta:', error);
      setErrorMessage(
        error.response?.data?.error || 'Wystąpił błąd podczas dodawania klienta.'
      );
    }
  };

  return (
    <div>
      <h1>Dodaj Klienta</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nazwa:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adres:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">NIP:</label>
          <input
            type="text"
            className="form-control"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Dodaj Klienta</button>
      </form>
    </div>
  );
};

export default AddClientPage;
