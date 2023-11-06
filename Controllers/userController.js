const connection = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// HON AAM BAAML AAD
exports.createUser = async (req, res) => {
  try {
    const { role, full_name, username, email, password, joining_date } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const query = `INSERT INTO users (role, full_name, username, email, password, joining_date) VALUES ('${role}','${full_name}','${username}','${email}','${hashedPassword}','${joining_date}')`;
    const [result] = await connection.promise().query(query);
    if(!result){
      throw new Error("could not add");
    }
    const user=result[0];
    const token = jwt.sign({user}, process.env.SECRET_VALUE, { expiresIn: '1d' });
    res.status(201).json({user,token}); 
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};


// HON AAM BAAML GET 
exports.getAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getUserId = async (req, res) => {
  const name = req.params.name;
  try {
    const query = `SELECT user_id FROM users WHERE full_name='${name}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllCoaches = async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role='Coach' OR role='coach'";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllTrainees = async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role='Trainee' OR role='trainee'";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// HON AAM BAAML GET LA USER WAHAD BY ID
exports.getOneUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE user_id= ${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}
exports.getUsersByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const query = `SELECT * FROM users WHERE username='${username}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}
exports.getUsersByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const query = `SELECT * FROM users WHERE email='${email}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}

// HON AAM BAAML GET LA USER WAHAD BY NAME
exports.getOneUserByName = async (req, res) => {
  try {
    const fullName = req.params.name;
    const query = `SELECT * FROM users WHERE full_name= '${fullName}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}

//HON BDE AAML GET LAL USER LAMMA YAAML SIGN IN
exports.getOneUserByEmailPassword = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    try {
      const query = `SELECT * FROM users WHERE email =?`;
      
      const [result] = await connection.promise().query(query,[email]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = result[0];
      console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      // console.log(await bcrypt.hash(password, 10))
      // console.log(await isPasswordValid)
      if (isPasswordValid) {
        const token = jwt.sign(user, process.env.SECRET_VALUE, { expiresIn: '1d' });
        res.status(201).json({user,token}); 
      } else {
        res.status(401).json({ error: 'failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
}

//HON AAM BAAML DELETE
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = `DELETE FROM users WHERE user_id=${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  try {
    const query = `UPDATE users SET username = '${newUsername}', email = '${newEmail}', password = '${newPassword}' WHERE user_id=${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error' });
  }
};