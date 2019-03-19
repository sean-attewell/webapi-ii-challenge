const express = require('express');
const routes = express.Router();
const Posts = require('./data/db.js');

routes.use(express.json());


routes.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
    try {
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
}});


routes.get('/', (req, res) => {
    Posts.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
})

routes.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post.length > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const numberDeleted = await Posts.remove(req.params.id);
        if (numberDeleted > 0) {
            res.status(200).json({ message: `Post ${req.params.id} has been deleted.` });
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" });
    }
});


module.exports = routes;