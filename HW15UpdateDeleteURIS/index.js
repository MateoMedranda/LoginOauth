const port = 3012;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@biosigma.jffjx5o.mongodb.net/Biosigma?retryWrites=true&w=majority&appName=Biosigma`);

const db = mongoose.connection;

db.on("error",(error) => crossOriginIsolated.error(error));
db.once("open",() => console.log("System connected to MongoDB Database"));

app.use(express.json());

const EnvironmentalPlanRouter = require("./routes/environmentalPlanRoutes");
const activityRouter = require("./routes/activityRoutes");
const controlRouter = require("./routes/controlRoutes");

app.use("/projects/:projectId",EnvironmentalPlanRouter);
app.use("/environmental-plans/:planId",activityRouter);
app.use("/activities/:activityId",controlRouter);

app.listen(port,() => console.log("MY Computer Store Server is running on port --> "+port));
