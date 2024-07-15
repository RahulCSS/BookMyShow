const router = require('express').Router();
const User = require('../models/userModel');

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

module.exports = router;