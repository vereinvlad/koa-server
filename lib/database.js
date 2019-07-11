const { Client } = require('pg') // https://node-postgres.com/


module.exports = {
  getConnection: async () => {
    const client = new Client({
      user: 'vlad',
      password: '123', 
      database: 'myProjDB',
      port: 5432
    });
    
    await client.connect()
    return client;
  }  
}