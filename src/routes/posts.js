const express = require('express');
const router = express.Router();

const { Post } = require('../database');

// GET routes
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        attributes: [
            'id',
            'title',
            'img',
            'category_id',
            'createdAt'
        ],
        order: [['createdAt', 'DESC']]
    });

    if (posts.length > 0) {
        res.json(posts);
    } else {
        res.json({
            status: 'No posts created yet'
        })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (post) {
        res.json(post);
    } else {
        res.json({
            error: `Post with id: ${id} don't exists`
        });
    }
});


// POST routes
router.post('/', async (req, res) => {
    const { title, content, img, category_id } = req.body;

    // validates fields
    if (!title || !content || !img || !category_id) {
        return res.json({
            error: 'all fields are required'
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

    const post = await Post.create(newPost);

    res.json({
        status: 'Post created successfully',
        newPost: post
    });
});


// PATCH routes
router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    // validates if the post exists
    const post = await Post.findByPk(id);

    if (!post) {
        return res.json({
            error: `Post with id: ${id} don't exists`
        });
    }

    // if the post exists updates
    const updatedPost = req.body;

    // validate img if exists
    if (updatedPost.img) {
        if (!(img.endsWith('.jpg') || img.endsWith('.png') || img.endsWith('.jpeg'))) {
            return res.json({
                error: 'img field should be in a valid image extension. Ex: jpg, png, jpeg'
            });
        }
    }

    await Post.update(updatedPost, {
        where: { id }
    });

    res.json({
        status: `Post with id: ${id} updated succesfully`,
    });
});


// DELETE routes
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // validates if the post exists
    const post = await Post.findByPk(id);

    if (!post) {
        return res.json({
            error: `Post with id: ${id} don't exists`
        });
    }

    // if the post exists deletes
    await Post.destroy({
        where: { id }
    });

    res.json({
        status: `Post with id: ${id} deleted succesfully`
    });
}),

    module.exports = router;