module.exports = (sequelize, type) => {
    return sequelize.define('category', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
    });
};