const Sequalize = require('sequelize');

const myProjDB = new Sequalize('myProjDB', 'vlad', '123', {
  dialect: 'postgres'
});

module.exports = myProjDB;