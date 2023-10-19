const connection = require('../config/database');

// HON AAM BAAML AAD
exports.createUser = async (req, res) => {
  try {
    const { role ,full_name,username,email,password,joining_date } = req.body;
    const query =`INSERT INTO users  (role, full_name, username, email, password, joining_date) VALUES ('${role}','${full_name}','${username}','${email}','${password}','${joining_date}')`;
    const [result] = await connection.promise().query(query);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

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
  const name=req.params.name;
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
exports.getOneUserById = async (req ,res) =>{
  try{
    const userId=req.params.id;
    const query=`SELECT * FROM users WHERE user_id= ${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
  }
}

// HON AAM BAAML GET LA USER WAHAD BY NAME
exports.getOneUserByName = async (req ,res) =>{
  try{
    const fullName=req.params.name;
    const query=`SELECT * FROM users WHERE full_name= '${fullName}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
  }
}

//HON BDE AAML GET LAL USER LAMMA YAAML SIGN IN
exports.getOneUserByEmailPassword = async (req ,res) =>{
  try{
    const email=req.params.email;
    const password=req.params.password;
    const query=`SELECT * FROM users WHERE email='${email}'
    AND password='${password}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
  }
}

//HON AAM BAAML DELETE
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query=`DELETE FROM users WHERE user_id=${userId}`;
    const [result]= await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
};

