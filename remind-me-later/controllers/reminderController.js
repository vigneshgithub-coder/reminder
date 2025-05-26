const Reminder = require('../models/Reminder');

/// CREATE reminder
exports.createReminder = async (req, res) => {
  try {
    const { reminder_datetime, message, reminder_type } = req.body;

    if (!reminder_datetime || !message || !reminder_type) {
      return res.status(400).json({ success: false, error: 'Missing required fields: reminder_datetime, message, and reminder_type are required.' });
    }

    const reminderDate = new Date(reminder_datetime);

    if (isNaN(reminderDate.getTime())) {
      return res.status(400).json({ success: false, error: 'Invalid datetime format.' });
    }

    const reminder = await Reminder.create({
      reminder_datetime: reminderDate,
      message,
      reminder_type,
    });

    res.status(201).json({ success: true, data: reminder });
  } catch (err) {
    console.error('Error creating reminder:', err);
    res.status(500).json({ success: false, error: 'Server error: ' + err.message });
  }
};

// GET all reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json({ success: true, data: reminders });
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).json({ success: false, error: 'Server error: ' + err.message });
  }
};
