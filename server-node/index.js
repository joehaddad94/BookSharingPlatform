const express = require("express");
const cors = require("cors");
const app = express();
const body = require("body-parser")

const mongooseConnect = require("./configs/mongoDB.connect");
require("dotenv").config()

app.use(body.json());


app.use(cors());

const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const postsRouter = require("./routes/posts.routes");
app.use("/posts", authMiddleware, postsRouter);

app.listen(8000, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Server running on port: ", 8000);
    mongooseConnect();
});
