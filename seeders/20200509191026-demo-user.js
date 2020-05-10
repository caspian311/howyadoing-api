module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Matt',
      email: 'matt.c.todd@gmail.com',
      password: 'test',
      goal: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Abbi',
      email: 'abbi.todd@gmail.com',
      password: 'test',
      goal: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
