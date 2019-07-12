const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const session = require('koa-session');
const mainRoutes = require("routes/main");
const database = require('../lib/database');
const app = new Koa();

app.keys = ['some secret hurr'];

app.init = async () => {
  app.use(cors({
      credentials: true
  }));

  app.use(bodyParser());
  app.use(session({
    key: "SESSIONID"
  }, app));
  
  await database.sync() 
  app.context.sequelize = database;
  // routes
  app.use(mainRoutes);
};

module.exports = app;
