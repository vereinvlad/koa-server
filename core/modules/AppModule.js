const Response = require("core/Response");

class AppModule {
    async ping(ctx) {
        return Response.text(ctx, "pong");
    }
}

module.exports = new AppModule();