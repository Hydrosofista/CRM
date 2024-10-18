// api/clientRoutes.js

const express = require('express');
const { getAllClients, addClient, deleteClient, getClientById } = require('../controllers/clientController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Pobierz wszystkich klientów
router.get('/', authenticateToken, getAllClients);

// Dodaj nowego klienta
router.post('/', authenticateToken, addClient);

// Pobierz szczegóły klienta po ID
router.get('/:id', authenticateToken, getClientById);

// Usuń klienta po ID
router.delete('/:id', authenticateToken, deleteClient);

module.exports = router;