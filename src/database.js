const Sequelize = require('sequelize');
const postModel = require('./models/posts');
const categoryModel = require('./models/categories');

const sequelize = new Sequelize('blog_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Post = postModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);

sequelize.sync()
    .then(() => {
        console.log('DB connected');
    });

module.exports = {
    Post,
    Category
};