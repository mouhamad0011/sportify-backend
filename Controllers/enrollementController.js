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
exports.updateEnrollementByTraineeId= async (req,res)=>{
    try {
        const trainee_id=req.params.id;
        const {present}= req.body;
        const query= `UPDATE enrollements SET present=${present} WHERE trainee_id=${trainee_id}`;
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