const Router = require("koa2-router");

const AppModule = require("core/modules/AppModule");

const router = new Router();

const users = require("users");

const Yup = require("yup");
const validator = require("koa-yup-validator");

const ideaValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, 'Should be more than 4 characters')
      .max(20, 'Should be less than 20 characters')
      .required('Required'),
    description: Yup.string()
      .min(20, 'Should be more than 20 characters')
      .required('Required'),
    author: Yup.string()
      .min(4, 'Should be more than 4 characters')
      .max(30, 'Should be less than 30 characters')
      .matches(/^[a-zA-Zа-яА-Я ]+$/, 'Only letters allowed')
  });

const isAuth = (ctx, next) => {
    for (const user in users) {
        if (ctx.request.body.login === users[user].login && ctx.request.body.password === users[user].password) {
            return next();
        }
    }
    return Response.error(ctx);
}

router
    .get("/ideasCards", async ctx => {
        return AppModule.getIdeas(ctx);
    })
    .get("/ideasCards/:id", ctx => {
        return AppModule.getSingleIdea(ctx);
    })
    .post("/ideasCards", validator(ideaValidationSchema), ctx => {
        return AppModule.postIdeas(ctx);
    })
    .delete("/ideasCards/:id", async ctx => {
        return AppModule.deleteIdea(ctx);
    })
    .patch("/ideasCards/:id", validator(ideaValidationSchema), ctx => {
        return AppModule.patchIdea(ctx);
    })
    .post("/user", isAuth, ctx => {
        return AppModule.login(ctx);
    });

module.exports = router;
