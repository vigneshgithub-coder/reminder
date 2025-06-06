import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'  // Import CSS file

export default function App() {
  const [reminders, setReminders] = useState([])
  const [text, setText] = useState('')
  const [datetime, setDatetime] = useState('')
  const [method, setMethod] = useState('SMS') // Use uppercase to match backend enum

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await axios.get('https://reminder-ve5p.onrender.com/api/reminders')
        setReminders(res.data.data) // backend returns { success, data }
      } catch (err) {
        console.error("Error fetching reminders:", err.message)
      }
    }
    fetchReminders()
  }, [])

  const handleAddReminder = async () => {
    if (!text.trim() || !datetime || !method) return

    console.log('Sending reminder:', { message: text, reminder_datetime: datetime, reminder_type: method })

    try {
      const res = await axios.post('https://reminder-ve5p.onrender.com//api/reminders', {
        message: text,
        reminder_datetime: datetime,
        reminder_type: method,
      })
      setReminders([...reminders, res.data.data])
      setText('')
      setDatetime('')
      setMethod('SMS')
    } catch (err) {
      console.error("Error adding reminder:", err.response?.data || err.message)
    }
  }

  return (
    <div className="container">
      <h1>Remind Me Later</h1>

      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter reminder message"
          className="input-text"
        />

        <input
          type="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          className="input-text"
        />

        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="select-method"
        >
          <option value="SMS">sms</option>
          <option value="Email">email</option>
        </select>

        <button
          onClick={handleAddReminder}
          disabled={!text.trim() || !datetime || !method}
          className="btn-add"
        >
          Add Reminder
        </button>
      </div>

      <h3>Scheduled Reminders</h3>
      <table className="reminder-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Date & Time</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map(r => (
            <tr key={r._id || r.id}>
              <td>{r.message}</td>
              <td>{new Date(r.reminder_datetime).toLocaleString()}</td>
              <td>{r.reminder_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
