import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
},{timestamps:true});

const notesModel = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export default notesModel;