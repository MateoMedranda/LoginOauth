const express = require("express");
const activity = require("../models/activity");
const control = require("../models/control");
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

//Rule of the Business 
router.get("/compliance/", async (req, res) => {
    try {
        const planId = Number(req.params.planId);
        const activities = await activity.find({ planId: planId });

        let evaluate = 0;
        let satisfy = 0;

        for (const activityr of activities) {
            const controls = await control.find({ activityId: activityr.id }).sort({ date: -1 });

            if (controls.length == 0) continue;

            const lastControl = controls[0];
            const daysSinceLastControl = (new Date() - new Date(lastControl.date)) / (1000 * 60 * 60 * 24);

            let limit = 99999;
            switch (activityr.frecuency.toLowerCase()) {
                case 'mensual': limite = 30; break;
                case 'bimestral': limite = 60; break;
                case 'trimestral': limite = 90; break;
                case 'anual': limite = 365; break;
            }

            if(daysSinceLastControl <=limit){
                evaluate ++;
                if(lastControl.criterion.toLowerCase() == "cumple"){
                    satisfy ++;
                }
            }
        }

        let percentage = activities.length ? (satisfy / activities.length*100).toFixed(2):0;

        res.json(
            {
                totalActivities:activities.length,
                activitiesEvaluated: evaluate,
                activitiesSatisfy: satisfy,
                percentageSatisfy: percentage
            }
        );
    } catch (err) {

    }
});

module.exports = router;
