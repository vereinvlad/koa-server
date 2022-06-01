const Sequelize = require('sequelize');
const myProjDB = require('lib/database');

const Users = myProjDB.define('users', {
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    }
  }, 
    { myProjDB, tableName: 'users', timestamps: false }
);

module.exports = Users;