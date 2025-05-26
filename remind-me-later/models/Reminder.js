const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  reminder_datetime: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reminder_type: {
    type: String,
    enum: ['sms', 'email'],  // lowercase to match frontend
    required: true,
  },
});

module.exports = mongoose.model('Reminder', reminderSchema);
