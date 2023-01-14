INSERT INTO department
  (name)

VALUES
  ('Engineer'),
  ('Management'),
  ('Warehouse'),
  ('Sales'),
  ('CEO'),
  ('Finance');

  -- puts employees into table

INSERT INTO job 
  (title, salary, department_id)

VALUES
  ('Executive', 250000, 1),
  ('Manager', 175000, 2),
  ('Software Engineer', 125000, 3),
  ('Accountant', 90000, 4),
  ('Salesman', 75000, 5),
  ('Stocker', 40000, 6);

INSERT INTO employee
  (first_name, last_name, job_id, manager_id)

VALUES
  ('Jaime', 'Buchanan', 1, 1),
  ('Mike', 'Pergolatti', 3, 2),
  ('Stella', 'Mae', 4, 3),
  ('Paisley', 'Buchanan', 2, 4),
  ('John', 'Thomas', 5, 5),
  ('Alex', 'Woodard', 6, 6);