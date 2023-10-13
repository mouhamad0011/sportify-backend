const connection = require('../config/database');

// HON AAM BAAML AAD
exports.createQuiz = async (req, res) => {
  try {
    const {quiz_id , trainee_id , course_name ,date ,result } = req.body;
    const query =`INSERT INTO users VALUES (${quiz_id},${trainee_id},'${course_name}','${date}','${result}')`;
    const [results]= await connection.promise().query(query);
    res.status(201).json(results);
  } catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ error: 'Server Error'});
  }
}

// HON AAM BAAML GET 
exports.getAllQuizzes = async (req, res) => {
  try {
    const query="SELECT * FROM quizzes";
    const [result]=await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"ERRORRRR"});
  }
};

// HON AAM BAAML GET LA QUIZ WEHDE BY ID
exports.getOneQuizById = async (req ,res) =>{
  try{
    const quizId=req.params.id;
    const query=`SELECT * FROM quizzes WHERE quiz_id= ${quizId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"ERRORRRR"});
  }
}

// HON AAM BAAML GET LA QUIZ WHDE BY COURSE_NAME
exports.getOneQuizByCourseName = async (req ,res) =>{
  try{
    const courseName=req.params.courseName;
    const query=`SELECT * FROM quizzes WHERE course_name= '${courseName}'`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"ERRORRRR"});
  }
}

//HON AAM BAAML DELETE
exports.deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const query=`DELETE FROM quizzes WHERE quiz_id=${quizId}`;
    const [result]= await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
};


