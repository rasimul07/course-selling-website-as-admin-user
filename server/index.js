const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use(cors());

app.use(express.json());

app.use('/admin',adminRouter);
app.use('/user',userRouter);

//connect to MongoDB
mongoose.connect('mongodb+srv://rasimulislam722:eRE8r3Rq3CBHhxRK@cluster0.khqazcv.mongodb.net/course', { useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000, () => console.log('Server running on port 3000'));
