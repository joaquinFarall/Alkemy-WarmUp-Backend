const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Post = db.Post;
const Category = db.Category;

const errorhandler = (err, res) => {
    console.log(err);
    res.json({ 'error': 'could not make the query to the DB' });
};

// GET routes
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'img',
            'createdAt'
        ],
        order: [['createdAt', 'DESC']],
        include: [db.Category]
    })
        .then(posts => {
            if (posts.length > 0) {
                res.json(posts);
            } else {
                res.json({
                    status: 'No posts created yet'
                })
            }
        })
        .catch(err => errorhandler(err, res));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Post.findByPk(id, {
        attributes: [
            'id',
            'title',
            'content',
            'img',
            'createdAt'
        ],
        include: [db.Category]
    })
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.json({
                    error: `Post with id: ${id} don't exists`
                });
            }
        })
        .catch(err => errorhandler(err));
});


// POST routes
router.post('/', async (req, res) => {
    const { title, content, img, category_id } = req.body;

    // validates that the fields are not empty
    if (!title || !content || !img || !category_id) {
        return res.json({
            error: 'all fields are required'
        });
    }

    // validates category_id field
    let isValid = false;

    let categories = await Category.findAll();

    categories.forEach(category => {
        if (category_id == category.id) isValid = true;
    });

    if (!isValid) {
        return res.json({
            error: 'invalid category_id field'
        });
    }

    // validates image field
    if (!(img.endsWith('.jpg') || img.endsWith('.png') || img.endsWith('.jpeg'))) {
        return res.json({
            error: 'img field should be in a valid image extension. Ex: jpg, png, jpeg'
        });
    }

    const newPost = {
        title,
        content,
        img,
        category_id
    };

    Post.create(newPost)
        .then(post => {
            res.json({
                status: 'Post created successfully',
                newPost: post
            });
        })
        .catch(err => errorhandler(err, res));
});


// PATCH routes
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    // validates if the post exists
    let post = await Post.findByPk(id)

    if (!post) {
        return res.json({
            error: `Post with id: ${id} doesn't exists`
        });
    }

    // validates category_id field if exists
    if (req.body.category_id) {
        let { category_id } = req.body;
        let isValid = false;

        let categories = await Category.findAll();

        categories.forEach(category => {
            if (category_id == category.id) isValid = true;
        });

        if (!isValid) {
            return res.json({
                error: 'invalid category_id field'
            });
        }
    }

    // validate img extension if exists
    if (req.body.img) {
        let img = req.body.img;

        if (!(img.endsWith('.jpg') || img.endsWith('.png') || img.endsWith('.jpeg'))) {
            return res.json({
                error: 'img field should be in a valid image extension. Ex: jpg, png, jpeg'
            });
        }
    }

    // if every validation is OK updates
    const updatedPost = req.body;

    Post.update(updatedPost, {
        where: { id }
    })
        .then(post => {
            res.json({
                status: `Post with id: ${id} updated succesfully`,
            });
        })
        .catch(err => errorhandler(err, res));
});


// DELETE routes
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // validates if the post exists
    let post = await Post.findByPk(id)

    if (!post) {
        return res.json({
            error: `Post with id: ${id} doesn't exists`
        });
    }

    // if the post exists deletes
    Post.destroy({
        where: { id }
    })
        .then(post => {
            res.json({
                status: `Post with id: ${id} deleted succesfully`
            });
        })
        .catch(err => errorhandler(err, res));
});

module.exports = router;