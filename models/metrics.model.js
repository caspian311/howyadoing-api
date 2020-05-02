module.exports = (sequelize, Sequelize) => {
    const Metric = sequelize.define("metrics", {
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      goal: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Metric;
  };