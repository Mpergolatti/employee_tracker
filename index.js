// const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

// const PORT = process.env.PORT || 3001;
// const app = express()

// // express middle ware
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

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

db.connect(err => {
  if (err) throw err
  console.log('Database Connected')
  employee()
})

var employee = function () {
  inquirer.prompt([
    {
    type: 'list',
    name: 'prompt',
    message: 'Choose Option',
    choices: ['View All Departments', 'View All Jobs', 'View All Employees', 'Add A Department', 'Add A Job', 'Add An Employee', 'Update An Employee Job', 'Log Out']
    }
]).then((answers) => {
    
    // Check the department table in the database
    if (answers.prompt === 'View All Departments') {
      db.query(`select * from department`, (err, result) => {
        if (err) throw err;
        console.log('Viewing All Departments: ')
        console.table(result)
        employee();
      })

    } else if (answers.prompt === 'View All Jobs') {
      db.query(`select * from job`, (err, result) => {
        if (err) throw err;
        console.log('Viewing All Jobs: ')
        console.table(result);
        employee();
      })

    } else if (answers.prompt === 'View All Employees') {
      db.query(`select * from employee`, (err, result) => {
        if (err) throw err;
        console.log('Viewing All Employees: ')
        console.table(result);
        employee()
      })

    } else if (answers.prompt === 'Add A Department') {
      inquirer.prompt([
        {

        // Add A Department
        type: 'input',
        name: 'department',
        message: 'What is the name of the Department you would like to create?',
          validate: departmentInput => {
            if (departmentInput) {
              return true;
            } else {
              console.log('Please Add A Department')
              return false;
            }
          }
        }
    ]).then((answers) => {
        db.query(`insert into department (name) values (?)`, [answers.department], (err, result) => {
          if (err) throw err;
          console.log(`Added ${answers.department} to the database.`)
          employee();
        })
      })

    } else if (answers.prompt === 'Add A Job') {
      db.query(`select * from department`, (err, result) => {
        if (err) throw err;

        inquirer.prompt([
          {

          // Add A Job
          type: 'input',
          name: 'job', 
          message: 'What is the name of the job?',
            validate: jobInput => {
              if (jobInput) {
                return true;
              } else {
                console.log('Please Add A Job');
                return false;
              }
            }
          },
          {
            // Add A Salary
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this job?',
              validate: salaryInput => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log('Please Add A Salary')
                  return false;
                }
              }
          },
          {
            // Add employee to a department
            type: 'list',
            name: 'department',
            message: 'Which department does the job belong too?',
              choices: () => {
                var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].name);
                  }
                  return array;
              }
          }
      ]).then((answers) => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].name === answers.department) {
            var department = result[i];
          }
        }
        
          db.query(`insert into job (title, salary, department_id) values (?, ?, ?)`, [answers.job, answers.salary, department.id], (err, result) => {
            if (err) throw err
            console.log(`Added ${answers.job} to the database.`)
            employee();
          })
        })
      })

    } else if (answers.prompt === 'Add An Employee') {
      db.query(`select * from employee, job`, (err, result) => {
        if (err) throw err

        inquirer.prompt([
        {
          // Employee First Name
          type: 'input',
          name: 'firstName',
          message: 'Please Enter the First Name',
            validate: firstNameInput => {
              if (firstNameInput) {
                return true;
              } else {
                console.log('Please Add the First Name of the Employee')
                return false;
              }
            }
        },
        {
          // Employee Last Name
          type: 'input',
          name: 'lastName',
          message: 'Please Enter the Last Name',
            validate: lastNameInput => {
              if (lastNameInput) {
                return true
              } else {
                console.log('Please Add the Last Name of the Employee')
                return false;
              }
            }
        },
        {
          // Add Employee Job
          type: 'list',
          name: 'job',
          message: 'What is the employees job?',
            choices: () => {
              var array = [];
              for ( var i = 0; i < result.length; i++ ) {
                array.push(result[i].title);
              }
              var newArray = [...new Set(array)];
              return newArray;
            }
        },
        {
          // Add the employee's Manager
          type: 'input',
          name: 'manager',
          message: 'Who is the employees Manager?',
            validate: managerInput => {
              if (managerInput) {
                return true;
              } else {
                console.log('Please add a manager')
                return false;
              }
            }
          }
        ]).then((answers) => {
          for (var i = 0; i < result.length; i++) {
            if (result[i].title === answers.job) {
              var job = result[i];
            }
          }

          db.query(`insert into employee (first_name, last_name, job_id, manager_id) values (?, ?, ?, ?)`, [answers.firstName, answers.lastName, job.id, answers.manager.id], (err, result) => {
            if (err) throw err
              console.log(`Added ${answers.firstName} ${answers.lastName}, to the database`)
              employee();
          })
        })
      })
    } else if (answers.prompt === 'Update an Employee Job') {
      db.query(`select * from employee, job`, (err, result) => {
        if (err) throw err;

        inquirer.prompt([
          {
            // Select employee to update
            type: 'list',
            name: 'employee',
            message: 'Which employee job do you want to update?',
            choices: () => {
              for (var i = 0; i < result.length; i++) {
                array.push(result[i].last_name)
              }
              var employeeArray = [...new Set(array)]
              return employeeArray;
            }
          },
          {
            // Update the Job
            type: 'list',
            name: 'job',
            message: 'What is their new Job?',
              choices: () => {
                var array = [];
                for (var i = 0; i < result.length; i++) {
                  array.push(result[i].title)
                }
                var newArray = [...new Set(array)]
                return newArray;
              }
          }
        ]).then((answers) => {
          for (var i = 0; i < result.length; i++) {
            if (result[i].last_name === answers.employee) {
              var name = result[i]
            }
          }

          for (var i = 0; i < result.length; i++) {
            if (result[i].title === answers.job) {
              var job = result[i];
            }
          }

          db.query(`update employee set ? where ?`, [{job_id: job}, {last_name: name}], (err, result) => {
            if (err) throw err
            console.log(`Updated ${answers.employee} job to the database.`)
            employee()
          })
        })
      })
    } else if (answers.prompt === 'Log Out') {
      db.end();
      console.log('Program Ended')
    }
  })
}


// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
