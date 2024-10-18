// router/mainRouter.js

const express = require('express');
const clientRoutes = require('../api/clientRoutes');
const actionRoutes = require('../api/actionRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

// Trasy autoryzacji
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Trasy klientów
router.use('/clients', clientRoutes);

// Trasy akcji
router.use('/actions', actionRoutes);

module.exports = router;