const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sportify'
});

const createUsersQuery = `CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(255),
  full_name VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  joining_date DATE
)`;
connection.promise().query(createUsersQuery)
  .then(() => {
    console.log(`users has been created `);
  })
  .catch((error) => {
    console.error(`Error creating table "users":`, error);
  });

  const createQuizzesQuery = `
  CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    trainee_id INT,
    course_id INT,
    date DATE,
    result VARCHAR(255),
    FOREIGN KEY (trainee_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;

connection.promise().query(createQuizzesQuery)
  .then(() => {
    console.log(`quizzes has been created`);
  })
  .catch((error) => {
    console.error(`Error creating table quizzes:`, error);
  });

  const createEnrollementQuery = `
  CREATE TABLE IF NOT EXISTS enrollement (
    class_id INT,
    trainee_id INT,
    present BOOLEAN,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (trainee_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;

connection.promise().query(createEnrollementQuery)
  .then(() => {
    console.log(`enrollement has been created`);
  })
  .catch((error) => {
    console.error(`Error creating table enrollement:`, error);
  });

  const createCoursesQuery = `
  CREATE TABLE IF NOT EXISTS courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    description VARCHAR(255),
    coach_id INT,
    FOREIGN KEY (coach_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;

connection.promise().query(createCoursesQuery)
  .then(() => {
    console.log(`courses has been created`);
  })
  .catch((error) => {
    console.error(`Error creating table courses:`, error);
  });

  const createClassesQuery = `
  CREATE TABLE IF NOT EXISTS classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    date DATE,
    hour VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;

connection.promise().query(createClassesQuery)
  .then(() => {
    console.log(`classes has been created`);
  })
  .catch((error) => {
    console.error(`Error creating table classes:`, error);
  });

module.exports = connection;