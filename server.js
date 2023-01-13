const express = require('express')
const mysql = require('mysql2')
const inquirer = require ('inquirer')

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

var employee = function () {
  inquirer.createPromptModule([{
    type: 'list',
    name: 'prompt',
    message: 'Choose Option',
    choices: ['View All Departments', 'View All Jobs', 'View All Employee', 'Add A Department', 'Add A Job', 'Add An Employee', 'Update An Employee Job', 'Log Out']
  }]). then((answers) => {
    
    // Check the department table in the database
    if (answers.prompt === 'View All Departments') {
      db.query(`select * from department`, (err, result) => {
        if (err) throw err;
        console.log('Viewing All Departments: ')
        console.table(result)
        employee();
      })
    } else if (answers.prompt === 'View All Jobs') {
      
    }
  })
}


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
