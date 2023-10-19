const connection = require('../config/database');

exports.getEnrollements = async (req, res) => {
    try {
        const query1 = 'SELECT * FROM enrollement';
        const [result] = await connection.promise().query(query1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"An error occured: couldn't get data "});
    }
}

exports.addEnrollement= async (req,res)=>{
    try {
        const {class_id , trainee_id , present} = req.body;
        const query =`INSERT INTO enrollement VALUES (${class_id},${trainee_id},${present})`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occured : could not add data"});
    }
}
exports.updateEnrollementByTraineeName= async (req,res)=>{
    try {
        const trainee_name=req.params.name;
        const query= `UPDATE enrollement SET present=!present WHERE trainee_id=(SELECT user_id 
                     FROM users WHERE full_name='${trainee_name}')`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Could not update"})
    }
}

exports.getEnrollementByClassId= async (req, res) => {
    try {
        const classId= req.params.id;
        const query1 = `SELECT * FROM enrollements WHERE class_id=${classId}`;
        const [result] = await connection.promise().query(query1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"An error occured: couldn't get data "});
    }
}

exports.getAttendanceByClassId= async (req, res) => {
    try {
        const classId= req.params.id;
        const query1 = `SELECT * FROM enrollements WHERE class_id=${classId} AND present=true`;
        const [result] = await connection.promise().query(query1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"An error occured: couldn't get data "});
    }
}

exports.deleteEnrollement = async (req, res) => {
    const classId = req.params.id;
  try {
    const query=`DELETE FROM enrollement WHERE class_id=${classId}`;
    const [result]= await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
  };

  exports.getEnrollementByTraineeId = async (req, res) => {
    const traineeId = req.params.id;
  try {
    const query=`SELECT enrollement.class_id,courses.course_name,users.full_name,enrollement.present,classes.date,classes.hour 
    FROM enrollement,users,classes,courses 
    WHERE enrollement.trainee_id=${traineeId} 
    AND enrollement.class_id=classes.class_id
    AND classes.course_id=courses.course_id 
    AND courses.coach_id=users.user_id`;
    const [result]= await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
  };