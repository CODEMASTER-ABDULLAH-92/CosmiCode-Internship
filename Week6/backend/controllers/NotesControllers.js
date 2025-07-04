import notesModel from "../models/NotesModel.js";

const addNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotes = new notesModel({
      title,
      content,
    });
    await newNotes.save();
    res.json({ success: true, message: "Notes Adding" });
  } catch (error) {
    res.json({ success: false, message: "Err in adding Notes" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({}).sort({createdAt:-1}); //Getting New Notes First 
    res.json({ success: true, message: "Getting all the data", notes });
  } catch (error) {
    res.json({ success: false, message: "Err in getting Notes" });
  }
};

const removeNotes = async (req, res) => {
  try {
    const id = req.params.id; // the id name should match in the route id like /add/:id 
    // await notesModel.findByIdAndDelete({id}); This is wrong
    await notesModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Delete The Notes" });
  } catch (error) {
    res.json({ success: false, message: "Err The Notes" });
    console.error("Err in remove Notes", error);
  }
};
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Optional: Input validation
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const updatedNote = await notesModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      notes: updatedNote,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error while updating note." });
  }
};

const getSingleNotes = async (req,res) =>{
    try {
        const id = req.params.id;
        const notes = await notesModel.findById(id);
        if(!notes) return res.json({success:false, message:"Notes Not Found"});
        res.json({success:true, message:'Getting Notes ', notes})
    } catch (error) {
        res.json({ success: false, message: " ERR Getting Single Notes :" });
    }
}
export { addNotes, removeNotes, getNotes, updateNotes,getSingleNotes };
