const Router = require("koa2-router");
const ManagerIdeas = require("core/manager/ManagerIdeas");

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
        return ManagerIdeas.getAllIdeas(ctx);
    })
    .get("/ideasCards/:id", sessionValidator, async ctx => {
        return ManagerIdeas.getSingleIdea(ctx);
    })
    .post("/ideasCards", sessionValidator, async ctx => {
        return ManagerIdeas.postIdea(ctx);
    })
    .delete("/ideasCards/:id", sessionValidator, async ctx => {
        return ManagerIdeas.deleteIdea(ctx);
    })
    .patch("/ideasCards/:id", sessionValidator, async ctx => {
        return ManagerIdeas.patchIdea(ctx);
    })
    .post("/signIn", async ctx => {
        return ManagerIdeas.signIn(ctx);
    })
    .post("/logOut", ctx => {
        return ManagerIdeas.logOut(ctx);
    });

module.exports = router;
