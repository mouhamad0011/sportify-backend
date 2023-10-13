const connection = require('../config/database');


exports.addCourse=async(req,res)=>{
    try{
        const {course_id,course_name,description,coach_id}=req.body;
        const query =`INSERT INTO courses VALUES (${course_id},'${course_name}','${description}',${coach_id})`;
        const [result]=await connection.promise().query(query);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'errorrr' });
    }
}

exports.getAllCourses= async (req,res) =>{
    try{
        const query = "SELECT * FROM courses";
        const [result] = await connection.promise().query(query);
        res.status(200).json( result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internel server error'});
    }
}

exports.getCourseById = async (req ,res) =>{
    try{
      const courseId=req.params.id;
      const query=`SELECT * FROM courses WHERE course_id= ${courseId}`;
      const [result] = await connection.promise().query(query);
      res.status(200).json(result);
    }
    catch(error){
      console.log(error);
    }
  }