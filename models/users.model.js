module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      goal: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return User;
  };