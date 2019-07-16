const Sequelize = require('sequelize');
const Ideas = require("models/Ideas");
const Users = require("models/Users");
class ManagerIdeas {
    async getAllIdeas(ctx) {
        const allIdeas = await Ideas.findAll(
            { 
                attributes: ['id', 'title', 'description', [Sequelize.col('user.login'), 'author']],
                include: [{
                    model: Users,
                    attributes: [], 
                    nested: false,
                    required: true,
                }], 
                raw: true
            }
        );
        ctx.body = allIdeas;
    }
    async getSingleIdea(ctx) {
        const singleIdea = await Ideas.findOne(
            { 
                where: { id : ctx.params.id},
                attributes: ['id', 'title', 'description', [Sequelize.col('user.login'), 'author']],
                include: [{
                    model: Users,
                    attributes: [], 
                    nested: false,
                }], 
                raw: true
            }
        );
        ctx.body = singleIdea;
    }
    async postIdea(ctx) {
        if (!ctx.request.body.title || !ctx.request.body.description) {
            throw new Error;
        }
        const newIdea = await Ideas.create(ctx.request.body, {fields: ['title', 'description']});
        ctx.body = newIdea;
    }
    async deleteIdea(ctx) {
        const deletedIdea = await Ideas.destroy({ where: {id: ctx.params.id}, raw: true });
        ctx.body = deletedIdea;
    }
    async patchIdea(ctx) {
        const updatedIdea = await Ideas.update(ctx.request.body, {fields: ['title', 'description'], where: {id: ctx.params.id}, returning: true, raw: true});
        ctx.body = updatedIdea[1][0];
    }
    async signIn(ctx) {
        const {login, password} = ctx.request.body;
        const user = await Users.findOne({where: { 'login' : login, 'password': password}, raw: true });
        ctx.assert(user, 401, 'Incorrect login or password!');
        
        ctx.body = user;
        ctx.session.user_id = user.id; 
    }
    async logOut(ctx) {
        ctx.session = null;
        ctx.body = 'success';
    }
}

module.exports = new ManagerIdeas();