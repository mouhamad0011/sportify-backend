const connection = require('../config/database');

exports.getQuesAnsByQuizId=async(req,res)=>{
    const quizId=req.params.id;
    try {
        const query=`SELECT * FROM QA WHERE quiz_id=${quizId}`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"ERRORRRR"})
    }
}

exports.createQuiz = async (req, res) => {
    try {
      const { quiz_id , questions , choices,correct_answers } = req.body;
      const query =`INSERT INTO QA (quiz_id , questions , choices,correct_answers ) VALUES (${quiz_id},'${questions}','${choices}','${correct_answers}')`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ error: 'Server Error'});
    }
  }