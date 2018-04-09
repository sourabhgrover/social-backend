'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('platforms', [
      {
        name : 'Facebook Page',
        img_name : 'fb-page.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Facebook Group',
        img_name : 'fb-group.png',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'WhatsApp',
        img_name : 'whatsapp.png',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Telegram',
        img_name : 'telegram.png',
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
   queryInterface.bulkDelete('platforms', [
    {
      name :'Facebook Page'
    },
    {
      name :'Facebook Group'
    },
    {
      name :'WhatsApp'
    },
    {
      name :'Telegram'
    }
    ])
  }
};
