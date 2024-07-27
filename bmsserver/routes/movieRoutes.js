const express = require('express');
const router = require('express').Router();
const movie = require('../models/movieModal');
const authMiddleware = require('../middlewares/authMiddleware');

//Create
router.post('/api/movie/addmovie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new movie(req.body);
        await newMovie.save();
        res.status(200).send({ success: true, message: 'Movie added successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to add movie' });
    }
});

//Read
router.get('/api/movie/getmovie', authMiddleware, async (req, res) => {
    try {
        const movies = await movie.find();
        res.status(200).send({ success: true, data: movies });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Failed to get movies' });
    }
});

//Update
router.put('/api/movie/updatemovie', authMiddleware, async (req, res) => {
    try {
        const updatedMovie = await movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.status(200).send({ success: true, data: updatedMovie });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to update movie' });
    }
});

//Delete
router.delete('/api/movie/deletemovie/', authMiddleware, async (req, res) => {
    try {
        await movie.findByIdAndDelete(req.query.movieId);
        res.status(200).send({ success: true, message: 'Movie deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, message: 'Failed to delete movie' });
    }
});



module.exports = router;