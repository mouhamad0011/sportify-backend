const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createUsersQuery = `CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(10),
  full_name VARCHAR(50),
  username VARCHAR(30) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  joining_date VARCHAR(255)
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
    course_id INT,
    date DATE,
    hour VARCHAR(10),
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

  const createQAQuery = `
  CREATE TABLE IF NOT EXISTS QA (
    quiz_id INT,
    questions VARCHAR(500),
    choices VARCHAR(700),
    correct_answers VARCHAR(500),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;

connection.promise().query(createQAQuery)
  .then(() => {
    console.log(`QA has been created`);
  })
  .catch((error) => {
    console.error(`Error creating table QA:`, error);
  });

module.exports = connection;