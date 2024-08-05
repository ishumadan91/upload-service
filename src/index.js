import fileparser from "./fileparser.js"
import express from "express";
import 'dotenv/config'

const app = express();

const port = 3000;

app.get("/healthcheck", (req, res) => {
    res.status(200);
    res.send("Ok")
})

app.post("/api/upload", async (req, res, next) => {
    await fileparser(req, res, next)
    .then(data => {
      res.status(200).json({
        message: "Success",
        data
      })
    })
    .catch(error => {
        console.log(error);
      res.status(400).json({
        message: "An error occurred.",
        error
      })
    })
})

app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
})