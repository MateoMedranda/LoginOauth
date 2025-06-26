const express = require("express");
const environmentalPlan = require("../models/environmentalPlan");
const router = express.Router({mergeParams:true});

router.get("/environmental-plans/", async (req,res) =>{
    try{
        const projectId = Number(req.params.projectId);
        const environmentalPlans = await environmentalPlan.find({projectId:projectId});
        res.json(environmentalPlans);
    }catch (err){
        res.status(500).json({message:err.message});
    }
});

router.put("/environmental-plans/:id",async (req,res) => {
    try{
        const updatedEP = await environmentalPlan.findOneAndUpdate(
            {id:req.params.id},
            req.body,
            { new: true }
        );
        res.json(updatedEP);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete("/environmental-plans/:id", async (req,res) =>{
    try{
        const deleteEP = await environmentalPlan.findOneAndDelete({id:req.params.id});
        res.json("The environmental Plan was deleted succesfull");
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;