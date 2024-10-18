// api/actionRoutes.js

const express = require('express');
const { getAllActionsByClientId, addAction, deleteAction } = require('../controllers/actionController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Pobierz wszystkie akcje dla konkretnego klienta
router.get('/client/:clientId', authenticateToken, getAllActionsByClientId);

// Dodaj nową akcję dla konkretnego klienta
router.post('/client/:clientId', authenticateToken, addAction);

// Usuń akcję po ID
router.delete('/:id', authenticateToken, deleteAction);

module.exports = router;