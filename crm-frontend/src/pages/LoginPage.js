import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;

      // Zapisz token w localStorage
      localStorage.setItem('authToken', token);
      console.log('Zalogowano, token zapisany:', token);

      // Przekierowanie do listy klientów po zalogowaniu
      navigate('/clients');
    } catch (error) {
      console.error('Błąd logowania:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hasło:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
