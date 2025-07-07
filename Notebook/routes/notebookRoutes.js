const express = require("express");
const notebook = require("../models/Notebook");
const router = express.Router();

router.get('/notebooks/:id', async (req,res) =>{
    try{
        const notebookObject = await notebook.findOne({serialNumber:req.params.id});
        if(notebookObject == null){
            res.status(400).json("The Notebook not exist or the id is wrong");
        }else{
            res.status(200).json(notebookObject);
        }
    }catch (err){
        res.status(500).json({message:err.message});
    }
});

router.get("/notebooks/", async (req,res) => {
    try{
        const notebooks = await notebook.find();
        res.json(notebooks);
    } catch (err){
        res.status(500).json({message: err,message});
    }
});

module.exports = router;
