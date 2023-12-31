const connection = require('../config/database');


exports.addCourse=async(req,res)=>{
    try{
        const {course_name,description,coach_id}=req.body;
        const query =`INSERT INTO courses (course_name,description,coach_id) VALUES ('${course_name}','${description}',${coach_id})`;
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

  exports.getCourseIdByCourseName = async (req ,res) =>{
    try{
      const courseName=req.params.name;
      const query=`SELECT course_id FROM courses WHERE course_name='${courseName}'`;
      const [result] = await connection.promise().query(query);
      res.status(200).json(result);
    }
    catch(error){
      console.log(error);
    }
  }

  exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
      const query=`DELETE FROM courses WHERE course_id=${courseId}`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };

  exports.getAllCoursesWithCoachName = async (req, res) => {
    try {
      const query=`SELECT course_id,course_name,description,coach_id,full_name
       FROM courses,users  WHERE coach_id=user_id`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };

  exports.getAllCoursesByCoachName = async (req, res) => {
    const name=req.params.name;
    try {
      const query=`SELECT course_id,course_name,description
       FROM courses,users  WHERE coach_id=user_id AND full_name='${name}'`;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };

  exports.getAllCoursesByTraineeId = async (req, res) => {
    
    const id=req.params.id;
    try {
      const query=`SELECT distinct users.full_name as coach,users.email,course_name,quizzes.quiz_id,questions,choices,correct_answers,quizzes.date,quizzes.hour
       FROM courses,classes,enrollement,quizzes,QA,users
       WHERE courses.course_id=classes.course_id
       AND courses.coach_id=users.user_id
       AND classes.class_id=enrollement.class_id
       AND courses.course_id=quizzes.course_id
       AND quizzes.quiz_id=QA.quiz_id
       AND enrollement.trainee_id=${id} `;
      const [result]= await connection.promise().query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'errorrr' });
    }
  };