const Router = require("koa2-router");

const Ideas = require("core/modules/AppModule");

const router = new Router();

const users = require("users");

/*const isAuth = (ctx, next) => {
    for (const user in users) {
        if (ctx.request.body.login === users[user].login && ctx.request.body.password === users[user].password) {
            return next();
        }
    }
    return Response.error(ctx);
}*/

router
    .get('/ideasCards', async ctx => {
        const allIdeas = await Ideas.findAll();
        ctx.body = allIdeas;
    })
    .get("/ideasCards/:id", async ctx => {
        const singleIdea = await Ideas.findOne({ where: { id : ctx.params.id}, raw: true });
        ctx.body = singleIdea;
    })
    .post("/ideasCards", async ctx => {
        const newIdea = await Ideas.create(ctx.request.body, {fields: ['title', 'description', 'author']});
        ctx.body = newIdea;
    })
    .delete("/ideasCards/:id", async ctx => {
        const deleteIdea = await Ideas.destroy({ where: {id: ctx.params.id}, raw: true });
        ctx.body = deleteIdea;
    })
    .patch("/ideasCards/:id", async ctx => {
        const updateIdea = await Ideas.update(ctx.request.body, {fields: ['title', 'description'], where: {id: ctx.params.id}, returning: true, raw: true});
        ctx.body = updateIdea[1][0];
    })
    /*.post("/user", isAuth, ctx => {
        return AppModule.login(ctx);
    })*/
    ;

module.exports = router;
