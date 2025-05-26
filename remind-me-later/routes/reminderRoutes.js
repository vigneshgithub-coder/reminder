const express = require('express');
const router = express.Router();
const { createReminder, getReminders } = require('../controllers/reminderController');

// GET all reminders
router.get('/', getReminders);

// POST new reminder
router.post('/', createReminder);

module.exports = router;
