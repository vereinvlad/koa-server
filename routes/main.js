const Router = require("koa2-router");
const ManagerIdeas = require("core/manager/ManagerIdeas");
const Sequelize = require('sequelize');
const Ideas = require("models/Ideas");
const Users = require("models/Users");

const router = new Router();

const sessionValidator = (ctx, next) => {
    if(ctx.session.user_id) {
        next();
    }
    else {
        ctx.assert(false, 401, 'Please login!');
    }
}

router
    .get('/ideasCards', sessionValidator, async ctx => {
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
    })
    .get("/ideasCards/:id", sessionValidator, async ctx => {
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
    })
    .post("/ideasCards", sessionValidator, async ctx => {
        if (!ctx.request.body.title || !ctx.request.body.description) {
            throw new Error;
        }
        const newIdea = await Ideas.create(ctx.request.body, {fields: ['title', 'description']});
        ctx.body = newIdea;
    })
    .delete("/ideasCards/:id", sessionValidator, async ctx => {
        const deleteIdea = await Ideas.destroy({ where: {id: ctx.params.id}, raw: true });
        ctx.body = deleteIdea;
    })
    .patch("/ideasCards/:id", sessionValidator, async ctx => {
        const updateIdea = await Ideas.update(ctx.request.body, {fields: ['title', 'description'], where: {id: ctx.params.id}, returning: true, raw: true});
        ctx.body = updateIdea[1][0];
    })
    .post("/signIn", async ctx => {
        const {login, password} = ctx.request.body;
        const user = await Users.findOne({where: { 'login' : login, 'password': password}, raw: true });
        if (user) {
            ctx.body = user;
            ctx.session.user_id = user.id;
        } else {
            ctx.assert(false, 401, 'Incorrect login or password!');
        }
    })
    .post("/logOut", ctx => {
        ctx.session = null;
        ctx.body = 'success';
    });

module.exports = router;
