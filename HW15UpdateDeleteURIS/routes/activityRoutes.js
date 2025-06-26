const express = require("express");
const activity = require("../models/activity");
const router = express.Router({mergeParams:true});

router.get("/activities/", async (req,res) =>{
    try{
        const planId = Number(req.params.planId);
        const activities = await activity.find({planId:planId});
        res.json(activities);
    }catch (err){
        res.status(500).json({message:err.message});
    }
});

router.put("/activities/:id",async (req,res) => {
    try{
        const updatedActivity = await activity.findOneAndUpdate(
            {id:req.params.id},
            req.body,
            { new: true }
        );
        res.json(updatedActivity);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete("/activities/:id", async (req,res) =>{
    try{
        const deleteActivity = await activity.findOneAndDelete({id:req.params.id});
        res.json("The activity was deleted succesfull");
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;