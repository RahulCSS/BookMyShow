const express = require('express');
const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/api/user/register',async (request, response) => {
    try {
        const userExists = await User.findOne({email: request.body.email });
        
        if(userExists) {
            response.status(403).send({
                success: false,
                message: 'User already exists'
            });
            return;
        }
        //* Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashedPassword;

        const newUser = new User(request.body);
        await newUser.save();

        response.status(200).send({ 
            success: true,
            message: 'User registered successfully, Please Login' 
        });
    } catch (err) {
        console.error(err);
        response.status(403).json({ 
            success: false,
            message: 'Failed to register user,Please try again later'
        });
    };
});

router.post('/api/user/login',async (request, response) => {
    try{
        const user = await User.findOne({email: request.body.email });
        if(!user ) {
            response.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            });
            return;
        }
        
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if(!validPassword ) {
            response.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            });
            return;
        }

        const token = jwt.sign(
                                {userId: user.id, emailId: user.email}, 
                                process.env.jwtCode,
                                {expiresIn:'1d'});

        response.status(200).send({ 
            success: true,
            message: 'User logged in successfully',
            data: token
        });
        
    }catch(err){
        console.error(err);
        response.status(403).json({ 
            success: false,
            message: 'Failed to register user,Please try again later'
        });
    }
});

router.get('/api/user/getcurrentuser', authMiddleware, async (req, res,next) =>{
    try{
        const user = await User.findById(req.body.userId).select('-password');
        res.send({
            success: true,
            message: 'User details retrieved successfully',
            data: user
        });
        next();
    }catch(err){
        res.status(500).send({
            success: false,
            message: 'Something went wrong'
        });
    }
});

module.exports = router;