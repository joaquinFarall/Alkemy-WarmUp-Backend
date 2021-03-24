module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "id"
            }
        },
    }, {
        updatedAt: false,
    });

    Post.associate = models => {
        Post.belongsTo(models.Category, { foreignKey: 'category_id' })
    }

    return Post;
}