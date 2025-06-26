const express = require("express");
const control = require("../models/control");
const router = express.Router({mergeParams:true});

router.get("/controls/", async (req,res) =>{
    try{
        const activityId = Number(req.params.activityId);
        const controls = await control.find({activityId:activityId});
        res.json(controls);
    }catch (err){
        res.status(500).json({message:err.message});
    }
});

router.put("/controls/:id",async (req,res) => {
    try{
        const updatedControl = await control.findOneAndUpdate(
            {id:req.params.id},
            req.body,
            { new: true }
        );
        res.json(updatedControl);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete("/controls/:id", async (req,res) =>{
    try{
        const deleteControl = await control.findOneAndDelete({id:req.params.id});
        res.json("The control was deleted succesfull");
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;