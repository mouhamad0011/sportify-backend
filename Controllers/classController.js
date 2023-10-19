const connection = require('../config/database');


exports.addClass=async(req,res)=>{
    try{
        const {course_id, date,hour}=req.body;
        const query =`INSERT INTO classes (course_id,date,hour) VALUES (${course_id},'${date}','${hour}')`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'errorrr' });
    }
}

exports.getAllClasses= async (req,res) =>{
    try{
        const query = "SELECT * FROM classes";
        const [result] = await connection.promise().query(query);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message :'errorrr'});
    }
}

exports.getClassById = async (req ,res) =>{
    try{
      const ClassId=req.params.id;
      const query=`SELECT * FROM classes WHERE class_id= ${ClassId}`;
      const [result] = await connection.promise().query(query);
      res.status(200).json(result);
    }
    catch(error){
      console.log(error);
      res.status(500).json({message:"ERRORR"});
    }
  }

exports.getClassesByCoachId= async (req,res) =>{
    try {
        const coachId=req.params.id;
        const query=`SELECT * FROM classes,courses WHERE classes.course_id=courses.course_id AND coach_id=${coachId}`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"ERRORR"});
    }
  }

exports.getAllClassesByCourseId= async (req,res)=>{
    try {
        const courseId=req.params.id;
        const query=`SELECT * FROM classes WHERE  course_id=${courseId}`;
        const [result]= await connection.promise().query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"ERRORR"});
    }
}

exports.getAllClassesWithDetails = async (req, res) => {
    try {
      const query=`SELECT class_id,course_name,full_name,date,hour
       FROM classes,courses,users  WHERE coach_id=user_id AND 
       classes.course_id=courses.course_id`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };

  exports.getClassCourseDateHour = async (req, res) => {
    const id=req.params.id;
    try {
      const query=`SELECT classes.class_id, courses.course_name, classes.date, classes.hour
      FROM classes, courses
      WHERE courses.coach_id = ${id}
      `;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };

  exports.getClassNamesPresence = async (req, res) => {
    const id=req.params.id;
    try {
      const query=`SELECT full_name,present
      FROM enrollement,users
      WHERE enrollement.class_id =${id}
      AND enrollement.trainee_id=users.user_id
      `;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };


  exports.deleteClass = async (req, res) => {
    const classId = req.params.id;
    try {
      const query=`DELETE FROM classes WHERE class_id=${classId}`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };