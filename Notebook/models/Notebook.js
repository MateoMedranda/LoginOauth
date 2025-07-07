const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema(
    {
        serialNumber:{type:Number},
        brand:{type:String},
        model:{type:String},
        dateInsert:{type:Date},
        insertby:{type:String},
        isNewN:{type:Boolean},
        price:{type:Number}
    },
    {collection:"Notebook"}
);

module.exports = mongoose.model("Notebook", notebookSchema);