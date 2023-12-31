const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connection = require('./config/database');
const userRouter = require('./Routes/userRoute');
const quizRouter = require('./Routes/quizRoute');
const courseRouter = require('./Routes/courseRoute');
const enrollementRouter = require('./Routes/enrollementRoute');
const classRouter = require('./Routes/classRoute');
const QARouter = require('./Routes/QARoute');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/quizzes', quizRouter);
app.use('/courses', courseRouter);
app.use('/enrollement', enrollementRouter);
app.use('/classes', classRouter);
app.use('/QA', QARouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
