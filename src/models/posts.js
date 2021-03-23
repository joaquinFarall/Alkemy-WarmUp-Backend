module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        content: {
            type: type.STRING,
            allowNull: false
        },
        img: {
            type: type.STRING,
            allowNull: false
        },
        category_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "id"
            }
        },
    }, {
        updatedAt: false,
    });
};