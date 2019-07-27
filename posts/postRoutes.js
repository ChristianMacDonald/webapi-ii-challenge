const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        db.insert(req.body).then(post => {
            db.findById(post.id).then(post => {
                res.status(201).json(post);
            });
        }).catch(error => {
            res.status(500).json({ error: 'There was an error while saving the post to the database.' });
        });
    } else {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
})

router.get('/', (req, res) => {
    db.find().then(posts => {
        console.log(posts);
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

module.exports = router;