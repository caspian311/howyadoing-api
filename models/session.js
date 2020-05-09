module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('sessions', {
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id' 
      },
    }
  });
  Session.associate = function(models) {
    Session.belongsTo(models.users)
  };
  return Session;
};