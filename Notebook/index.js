const port = 3012;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@notebook.t1u8rg5.mongodb.net/Notebook?retryWrites=true&w=majority&appName=Notebook`);

const db = mongoose.connection;

db.on("error",(error) => crossOriginIsolated.error(error));
db.once("open",() => console.log("System connected to MongoDB Database"));

app.use(express.json());
const notebookRouter = require("./routes/notebookRoutes");

app.use("/notebookstore",notebookRouter);

app.listen(port,() => console.log("MY Computer Store Server is running on port --> "+port));