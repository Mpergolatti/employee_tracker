const express = require('express')
const mysql = require('mysql2')
const inputCheck = require('./utils/inputCheck')

const PORT = process.env.PORT || 3001;
const app = express()

// express middle ware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Connect to the database
const db = mysql.createConnection(
  {
    host: 'localhost',

    // Your MySQL username
    user: 'root',

    // Your mySQL password
    password: 'weather**',
    database: 'employee'
  },
  console.log('Connected to the employee database.')
)

// Get all employees
app.get('/api/employee', (req, res) => {
  const sql = `select * from employees`

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return;
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

// GET a single employee
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a employee
app.post('/api/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
