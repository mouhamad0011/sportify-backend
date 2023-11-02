const connection = require('../config/database');

// HON AAM BAAML AAD
exports.createQuiz = async (req, res) => {
  try {
    const { course_id ,date,hour} = req.body;
    const query =`INSERT INTO quizzes (course_id ,date,hour) VALUES (${course_id},'${date}','${hour}')`;
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
exports.getOneQuizByCourseId = async (req ,res) =>{
  try{
    const courseId=req.params.id;
    const query=`SELECT * FROM quizzes WHERE course_id= ${courseId}`;
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

exports.updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const {date,hour}=req.body;
  try {
    const query=`UPDATE quizzes SET date="${date}",hour="${hour}" WHERE quiz_id=${quizId}`;
    const [result]= await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
};
