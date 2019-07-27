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
});

router.post('/:id/comments', (req, res) => {
    if (req.body.text) {
        db.insertComment({
            text: req.body.text,
            post_id: req.params.id
        }).then(comment => {
            db.findCommentById(comment.id).then(comment => {
                res.status(201).json(comment);
            });
        }).catch(error => {
            res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
        });
    } else {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
    }
});

router.get('/', (req, res) => {
    db.find().then(posts => {
        console.log(posts);
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
    db.findById(req.params.id).then(post => {
        if (post && post.length) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    }).then(error => {
        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

router.get('/:id/comments', (req, res) => {
    db.findById(req.params.id).then(post => {
        if (post && post.length) {
            db.findPostComments(req.params.id).then(comments => {
                res.status(200).json(comments);
            }).catch(error => {
                res.status(500).json({ error: 'The comments information could not be retrieved.' });
            });
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    }).catch(error => {
        res.status(500).json({ error: 'The comments information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {
    db.findById(req.params.id).then(post => {
        if (post && post.length) {
            db.remove(req.params.id).then(records => {
                res.status(200).json(post);
            }).catch(error => {
                res.status(500).json({ error: 'The post could not be removed.' });
            });
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    }).catch(error => {
        res.status(500).json({ error: 'The post could not be removed.' });
    });
});

router.put('/:id', (req, res) => {
    db.findById(req.params.id).then(post => {
        if (post && post.length) {
            if (req.body.title && req.body.contents) {
                db.update(req.params.id, req.body).then(records => {
                    db.findById(req.params.id).then(post => {
                        res.status(200).json(post);
                    });
                }).catch(error => {
                    res.status(500).json({ error: 'The post information could not be modified.' });
                });
            } else {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
            }
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    }).catch(error => {
        res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

module.exports = router;