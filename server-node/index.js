// const express = require("express");
// const app = express();
// const mongooseConnect = require("./configs/mongoDB.connect");
// require("dotenv").config()

// app.use(express.json())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// const authMiddleware = require("./middlewares/auth.middleware");

// const authRouter = require("./routes/auth.routes");
// app.use("/auth", authRouter)

// const postsRouter = require("./routes/posts.routes");
// app.use("/posts", authMiddleware, postsRouter)
// // app.use("/posts", postsRouter)

// app.listen(8000, (err)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log("server running on port: ", 8000)
//     mongooseConnect()
// })

const express = require("express");
const cors = require("cors");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
require("dotenv").config()

app.use(express.json());

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
