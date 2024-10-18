// controllers/authController.js

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Sprawdź, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik z tym adresem email już istnieje' });
    }

    // Tworzenie nowego użytkownika
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Użytkownik został zarejestrowany' });
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas rejestracji' });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Sprawdź, czy użytkownik istnieje
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Nieprawidłowy adres email lub hasło' });
    }

    // Generowanie tokenu JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas logowania' });
  }
};

module.exports = { registerUser, loginUser };