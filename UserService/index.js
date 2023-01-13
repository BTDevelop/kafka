const express   = require("express");
const app       = express();

const mongoose     = require("mongoose");
const session      = require("express-session");
const redis        = require("redis");
const cors         = require('cors')
const errorHandler = require('./errors/error-handler')

const { UserCreatedListener } = require('./listeners/user-created')
const  UserCreatedController  = require('./event-controllers/user-created-controller').userCreatedController

const { UserUpdatedListener } = require('./listeners/user-updated-listener')
const UserUpdatedController   = require('./event-controllers/user-updated-controller').userUpdatedController

const { PasswordChangedListener } = require('./listeners/password-changed-listener')
const PasswordChangedController = require('./event-controllers/password-changed-controller').passwordChangedController

app.use(express.json());
app.enable("trust proxy")
app.use(cors())



const {
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const userRouter = require("./routes/userRoutes");


const mongoURL = `mongodb://meryem:123456@mongo:27017/Users?authSource=admin`

const port = process.env.PORT || 3001;

const connectWithRetry = () => {
  mongoose
    .set("strictQuery", false)
    .connect(mongoURL)
    .then(() => console.log("Connected to the DB."))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

redisClient.connect().catch(console.error)


app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: true,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3600 * 100 * 24 ,
    },
  })
);

new UserCreatedListener().listen(UserCreatedController);
new UserUpdatedListener().listen(UserUpdatedController);
new PasswordChangedListener().listen(PasswordChangedController)

app.use("/api/v1/users", userRouter);
app.use(errorHandler)


app.listen(port, () => console.log(`Listening on port ${port}.`));
