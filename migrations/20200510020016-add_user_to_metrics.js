module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('metrics', 'userId', 
      { 
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'users',
          key: 'id'
        } 
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('metrics', 'userId');
  }
};
