module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Matt',
      email: 'matt.c.todd@gmail.com',
      password: '7373dad2df9ad4542b8a0d6bd8ca74f02ffc081f9cb1fba9d22c0818902feccf',
      goal: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Abbi',
      email: 'abbi.todd@gmail.com',
      password: '7373dad2df9ad4542b8a0d6bd8ca74f02ffc081f9cb1fba9d22c0818902feccf',
      goal: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
