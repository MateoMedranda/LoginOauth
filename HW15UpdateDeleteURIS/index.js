const port = 3012;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("")

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