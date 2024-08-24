import express from "express";

const app = express();

app.use("/app/text", (request, response) => {
    response.send("It works!!!")
})

app.listen(8800, ()=> {
    console.log("Server is running!!");
});