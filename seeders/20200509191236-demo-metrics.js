'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('metrics', [
      {
        value: 241,
        createdAt: '2020-05-03 10:00:00',
        updatedAt: '2020-05-03 10:00:00'
      },
      {
        value: 240,
        createdAt: '2020-05-04 10:00:00',
        updatedAt: '2020-05-04 10:00:00'
      },
      {
        value: 239,
        createdAt: '2020-05-05 10:00:00',
        updatedAt: '2020-05-05 10:00:00'
      },
      {
        value: 237,
        createdAt: '2020-05-06 10:00:00',
        updatedAt: '2020-05-06 10:00:00'
      },
      {
        value: 236,
        createdAt: '2020-05-07 10:00:00',
        updatedAt: '2020-05-07 10:00:00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('metrics', null, {});
  }
};
