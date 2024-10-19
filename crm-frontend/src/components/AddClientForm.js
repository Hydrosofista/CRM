
import React, { useState } from 'react';

const AddClientForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nip, setNip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, address, nip });
    }
  };

  return (
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
      <button type="submit" className="btn btn-primary">
        Dodaj Klienta
      </button>
    </form>
  );
};

export default AddClientForm;

