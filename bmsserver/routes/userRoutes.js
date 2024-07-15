const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/register',async (request, response) => {
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
    } catch (error) {
        console.error(err);
        response.status(403).json({ 
            success: false,
            message: 'Failed to register user,Please try again later'
        });
    };
});

router.post('/login',async (request, response) => {
    try{
        const user = await User.findOne({email: request.body.email });
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        
        if(!user || !validPassword) {
            response.status(403).send({
                success: false,
                message: 'Invalid Credentials'
            });
            return;
        }

        response.status(200).send({ 
            success: true,
            message: 'User logged in successfully',
        });
        
    }catch{
        console.error(err);
        response.status(403).json({ 
            success: false,
            message: 'Failed to register user,Please try again later'
        });
    }
});


module.exports = router;