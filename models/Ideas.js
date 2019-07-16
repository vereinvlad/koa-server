const Sequelize = require('sequelize');
const myProjDB = require('lib/database');

const Users = require('./Users');

const Ideas = myProjDB.define('ideas', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    author_id: {
      type: Sequelize.INTEGER,
    },

  }, 
    { myProjDB, tableName: 'ideas', timestamps: false }
);

Ideas.belongsTo(Users, {foreignKey: 'author_id', targetKey: 'id'})

module.exports = Ideas;