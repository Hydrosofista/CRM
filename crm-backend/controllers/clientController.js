// controllers/clientController.js

const Client = require('../models/ClientModel');

// Pobierz wszystkich klientów
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania klientów' });
  }
};

// Dodaj nowego klienta
const addClient = async (req, res) => {
  const { name, address, nip } = req.body;
  try {
    const newClient = new Client({ name, address, nip });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: 'Nie udało się dodać klienta' });
  }
};

// Pobierz szczegóły klienta po ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Klient nie został znaleziony' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych klienta' });
  }
};

// Usuń klienta po ID
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Klient nie został znaleziony' });
    }
    res.status(200).json({ message: 'Klient został usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się usunąć klienta' });
  }
};

module.exports = { getAllClients, addClient, getClientById, deleteClient };