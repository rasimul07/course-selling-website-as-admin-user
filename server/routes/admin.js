const express = require('express');
const {User, Course, Admin} = require('../db');
const jwt = require('jsonwebtoken');
const {SECRET}  = require('../middleware/auth');
const {authenticateJwt} = require('../middleware/auth');

const router = express.Router();

router.get('/me',authenticateJwt,async(req,res)=>{
    const admin = await Admin.findOne({username:req.user.username});
    if(!admin){
      res.status(200).json({message:"admin doesnot exist"})
      return;
    }
    res.json(
        {
            username: admin.username
        }
    )
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(200).json({ message: 'Admin already exists' }); //if status code 400 or more then axios returns actual error
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(200).json({ message: 'Invalid username or password' });
    }
  });
  
  router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(200).json({ message: 'Course created successfully', courseId: course.id });
  });
  
  router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(200).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });

  module.exports = router;