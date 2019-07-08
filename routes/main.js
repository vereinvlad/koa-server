const Router = require("koa2-router");

const AppModule = require("core/modules/AppModule");

const router = new Router();

router.get("/ping", ctx => {
    return AppModule.ping(ctx);
});

module.exports = router;
