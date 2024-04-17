const express = require("express");
const app = express();

const path = require("path");
const port = process.env.PORT || 3001;

const cookieParser = require("cookie-parser");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for  parsing application/x-www-form-url
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static_router");
const userRoute = require("./routes/user");
const { connectDb } = require("./connect");

// connectDb("mongodb://127.0.0.1:27017/short-url");
connectDb(process.env.MONGO_URL);

// app.get('/', (req, res) => res.send('Hello World!'))

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/r", urlRoute);

app.listen(port, () => console.log(`Short-URL app listening on port ${port}!`));
