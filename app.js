const express = require("express");

// const authMiddleware = require("./middlewares/auth-middleware");
const cookieParser = require("cookie-parser");
const app = express();

const port = 3000; //port setting

const commentsRouter = require("./routes/comments");
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const signupsRouter = require("./routes/signups");
const loginsRouter = require("./routes/logins");



//use setting
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(authMiddleware);
app.use("/", [commentsRouter,indexRouter,postsRouter,signupsRouter,loginsRouter]);



app.listen (port, () =>{
    console.log(port, "포트로 서버 켜짐")

})