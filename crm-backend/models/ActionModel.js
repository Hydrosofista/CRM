// models/ActionModel.js

const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  contactDate: {
    type: Date,
    required: true,
  },
  actionType: {
    type: String,
    enum: ['Telefon', 'Spotkanie', 'Inne'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Action', ActionSchema);