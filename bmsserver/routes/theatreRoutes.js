const express = require('express');
const router = require('express').Router();
const theatre = require('../models/theatreModal');
const authMiddleware = require('../middlewares/authMiddleware');


//Create
router.post('/api/theatre/addtheatre', authMiddleware, async (req, res) => {
    try {
        const newTheatre = new theatre(req.body);
        await newTheatre.save();
        res.status(200).send({ success: true, message: 'Theatre added successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to add theatre' });
    }
});

//Read

router.get('/api/theatre/gettheatrebyowner', authMiddleware, async (req, res) => {
    console.log(req.body);
    try {
        const theatres = await theatre.find({owner: req.body.userId}).populate('owner');
        //console.log(theatres);
        res.status(200).send({ success: true, data: theatres });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Failed to get theatre' });
    }
});

router.get('/api/theatre/gettheatre', authMiddleware, async (req, res) => {
    try {
        const theatres = await theatre.find().populate('owner');
        res.status(200).send({ success: true, data: theatres });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Failed to get theatre' });
    }
});

//Update
router.put('/api/theatre/updatetheatre', authMiddleware, async (req, res) => {
    try {
        const updatedTheatre = await theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        res.status(200).send({ success: true, data: updatedTheatre });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to update theatre' });
    }
});

//Delete
router.delete('/api/theatre/deletetheatre/', authMiddleware, async (req, res) => {
    try {
        await theatre.findByIdAndDelete(req.query.theatreId);
        res.status(200).send({ success: true, message: 'Theatre deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to delete theatre' });
    }
});



module.exports = router;