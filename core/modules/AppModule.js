const Sequelize = require('sequelize');
const myProjDB = require('lib/database');

const Ideas = myProjDB.define('ideas', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    }
  }, 
    { myProjDB, tableName: 'ideas', timestamps: false }
);

module.exports = Ideas;
/*
class AppModule {
    async login(ctx) {
        return Response.success(ctx);
    }
    async getIdeas(ctx) {
        const result = await ctx.db.query(`SELECT * FROM ideas`);
        ctx.body = result.rows;
    }
    async getSingleIdea(ctx) {
        const result = await ctx.db.query(`SELECT * FROM ideas WHERE id=$1`, [ctx.params.id]);
        ctx.body = result.rows[0];
    }
    async postIdeas(ctx) {
        const { title, description, author} = ctx.request.body;
        const result = await ctx.db.query('INSERT INTO ideas (title, description, author) VALUES ($1, $2, $3) RETURNING *', [title, description, author]); 
        ctx.body = result.rows[0];
    }
    async deleteIdea(ctx) {
        const result = await ctx.db.query('DELETE FROM ideas WHERE id=$1', [ctx.params.id])  
        ctx.body = result.rows;
    }
    async patchIdea(ctx) {
        const { title, description} = ctx.request.body;
        const result = await ctx.db.query(`UPDATE ideas SET title=$1, description=$2 WHERE id=$3 RETURNING *`, [title, description, ctx.params.id]);
        ctx.body = result.rows[0];
    }
}

module.exports = new AppModule();*/