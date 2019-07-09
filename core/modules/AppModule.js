const Response = require("core/Response");
let data = require("ideas");
class AppModule {
    async login(ctx) {
        return Response.success(ctx);
    }
    async getIdeas(ctx) {
        return Response.json(ctx, data);
    }
    async getSingleIdea(ctx) {
        for (const item in data) {
            if (data[item].id === Number(ctx.params.id)) {
                return Response.json(ctx, data.find(el => el.id === Number(ctx.params.id))); 
            }
        }
        return Response.error(ctx);
    }
    async postIdeas(ctx) {
        data.push(ctx.request.body);
        return Response.json(ctx, ctx.request.body);
    }
    async deleteIdea(ctx) {
        for (const item in data) {
            if (data[item].id === Number(ctx.params.id)) {
                data = data.filter(el => el.id !== Number(ctx.params.id));
                return Response.json(ctx, data);
            }
        }
        return Response.error(ctx);
    }
    async putIdea(ctx) {
        data.map(item => {
            if (item.id === Number(ctx.params.id)) {
                item = {...item, ...ctx.request.body};
            }
            return item;
        });
        return Response.json(ctx, data);
    }
}

module.exports = new AppModule();