'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


   return queryInterface.bulkInsert('categories', [
    {
      name : 'Digital Marketing',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'SEO',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Tech',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Website',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'MLM',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Bank',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Earn Money',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Freelancing Services ',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Startup Community',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : ' Daily Whatsapp Video Status',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Jobs Group',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Shopping Branded Products',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Fashion',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Service',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Business',
      img_name : '',
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
