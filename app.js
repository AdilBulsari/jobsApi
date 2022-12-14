require("dotenv").config();
require("express-async-errors");

const rateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
const xss = require("xss-clean");
const cors = require("cors");
//connectDb
const connectDB = require("./db/connect");
//routers

const authRouter = require("./routes/auth.route");
const jobsRouter = require("./routes/jobs.route");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const jobsAuth = require("./middleware/authentication");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
//routes
app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1><a href='/api-docs'>Documentation</a>");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsAuth, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Apply the rate limiting middleware to all requests

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
