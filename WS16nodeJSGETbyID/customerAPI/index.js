const port = 3012;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/oop?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error",(error) => crossOriginIsolated.error(error));
db.once("open",() => console.log("System connected to MongoDB Database"));

app.use(express.json());

const customerRouter = require("./routes/customerRoutes");

app.use("/computerstore",customerRouter);

app.listen(port,() => console.log("MY Computer Store Server is running on port --> "+port));