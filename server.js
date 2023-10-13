const express = require('express');
const app = express();
const connection=require('./config/database');
const userRouter = require('./Routes/userRoute');
const quizRouter = require('./Routes/quizRoute');
const courseRouter= require('./Routes/courseRoute');
const enrollementRouter = require('./Routes/enrollementRoute');
const classRouter= require('./Routes/classRoute');
const PORT =3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/quizzes', quizRouter);
app.use('/courses',courseRouter);
app.use('/enrollement',enrollementRouter);
app.use('/classes',classRouter);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
