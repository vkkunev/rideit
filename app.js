const Koa = require('koa');
const KoaRauter = require('koa-router');
const mount = require('koa-mount');
const body = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa-cors');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const serve = require('koa-static')

const resolvers = require('./graphql/resolvers/index');
const config = require('dotenv').config();


const app = new Koa();
const router = new KoaRauter();

const static = new Koa();
if (process.env.ENV === 'production') {
    static.use(serve('./client/build'));
    app.use(mount('/', static));
}


const PORT = process.env.PORT | 5000;

app.use(body());
app.use(logger());
app.use(cors());

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// TODO: Add more routes
// router.get('/', async (ctx, next) => {
//     const posts = await resolvers.getAllPosts();
//     ctx.body = posts;
//     console.log(__dirname);
//     await next();
// })

async function authenticate (ctx, next) {
    const { authorization } = ctx.headers;

    if (!authorization) {
        ctx.throw(401);
    }

    const token = authorization && authorization.split(' ')[1]
    
    if (!token) {
        ctx.throw(401);
      }
    
    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        if (!user) {
            ctx.throw(401);
        }
    } catch (err) {
        ctx.throw(401);
    }

    return next();
}
   
    cron.schedule('* * * * *', () => {
        resolvers.Mutation.setPupular();
      });

// router.use(["/createPost"], authenticate);

router.post('/posts', async (ctx, next) => {
    const data = ctx.request.body;
    const posts = await resolvers.Query.getAllPosts(data)
    ctx.body = posts;
    await next();
})

router.post('/editPost', async (ctx, next) => {
    const data = ctx.request.body;
    const post = await resolvers.Mutation.editPost(data);
    ctx.body = post;
    await next();
})

router.post('/vote', async (ctx, next) => {
    const data = ctx.request.body;
    const posts = await resolvers.Mutation.vote(data)
    ctx.body = posts;
    await next();
})

router.post('/createPost', async (ctx, next) => {
    const data = ctx.request.body;
    const response = await resolvers.Mutation.createPost(data);
    ctx.body = response;
    await next();
})

router.post('/register', async (ctx, next) => {
    const data = ctx.request.body;
    const response = await resolvers.Mutation.register(data);
    ctx.body = response;
    await next();
})

router.post('/login', async (ctx, next) => {
    const data = ctx.request.body;
    const response = await resolvers.Mutation.login(data);
    ctx.body = response;
    ctx.body.statusCode = ctx.status;
    await next();
})

router.post('/community', async (ctx, next) => {
    const data = ctx.request.body;
    const response = await resolvers.Mutation.createCommunity(data);
    ctx.body = response;
    ctx.body.statusCode = ctx.status;
    await next();
})

router.get('/community', async (ctx, next) => {
    const data = ctx.request.body;
    const response = await resolvers.Query.getAllCommunities();
    ctx.body = response;
    ctx.body.statusCode = ctx.status;
    await next();
})

app.use(mount('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
})))

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log('Server runing on ' + PORT));