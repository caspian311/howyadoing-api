module.exports = (sequelize, DataTypes) => {
  const Metric = sequelize.define('metric', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Metric;
};