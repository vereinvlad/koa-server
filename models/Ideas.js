const Sequelize = require('sequelize');
const myProjDB = require('lib/database');

const Users = require('./Users');

const Ideas = myProjDB.define('ideas', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING
    }
  }, 
    { myProjDB, tableName: 'ideas', timestamps: false }
);
Ideas.belongsTo(Users, {foreignKey: 'author_id'})

module.exports = Ideas;