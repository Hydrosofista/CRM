// controllers/actionController.js

const Action = require('../models/ActionModel');

// Pobierz wszystkie akcje dla konkretnego klienta
const getAllActionsByClientId = async (req, res) => {
  try {
    const actions = await Action.find({ clientId: req.params.clientId });
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania akcji' });
  }
};

// Dodaj nową akcję dla konkretnego klienta
const addAction = async (req, res) => {
  const { contactDate, actionType, description } = req.body;
  try {
    const newAction = new Action({
      clientId: req.params.clientId,
      contactDate,
      actionType,
      description,
    });
    await newAction.save();
    res.status(201).json(newAction);
  } catch (error) {
    res.status(400).json({ error: 'Nie udało się dodać akcji' });
  }
};

// Usuń akcję po ID
const deleteAction = async (req, res) => {
  try {
    const action = await Action.findByIdAndDelete(req.params.id);
    if (!action) {
      return res.status(404).json({ error: 'Akcja nie została znaleziona' });
    }
    res.status(200).json({ message: 'Akcja została usunięta' });
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się usunąć akcji' });
  }
};

module.exports = { getAllActionsByClientId, addAction, deleteAction };