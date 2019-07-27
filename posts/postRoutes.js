const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({ errorMessage: 'Failed to retrieve posts!' });
    });
});

module.exports = router;