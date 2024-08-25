import express from "express";
// import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"

const app = express();

app.use(express.json())

// app.use("/app/posts", postRoute) 
app.use("/index/auth", authRoute) 

app.listen(8800, ()=> {
    console.log("Server is running!!");
});