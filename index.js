import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/index/posts", postRoute) 
app.use("/index/auth", authRoute) 
app.use("/index/test", testRoute) 
app.use("/index/users", userRoute) 

app.listen(8800, ()=> {
    console.log("Server is running!!");
});



// npm start --env-file .env