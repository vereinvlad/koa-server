const Router = require("koa2-router");

const AppModule = require("core/modules/AppModule");

const router = new Router();

const users = require("users");

const isAuth = (ctx, next) => {
    for (const user in users) {
        if (ctx.request.body.login === users[user].login && ctx.request.body.password === users[user].password) {
            return next();
        }
    }
    return Response.error(ctx);
}

router
    .get("/ideas", ctx => {
        return AppModule.getIdeas(ctx);
    })
    .get("/ideas/:id", ctx => {
        return AppModule.getSingleIdea(ctx);
    })
    .post("/ideas", ctx => {
        return AppModule.postIdeas(ctx);
    })
    .delete("/ideas/:id", ctx => {
        return AppModule.deleteIdea(ctx);
    })
    .put("/ideas/:id", ctx => {
        return AppModule.putIdea(ctx);
    })
    .post("/user", isAuth, ctx => {
        return AppModule.login(ctx);
    });

module.exports = router;
