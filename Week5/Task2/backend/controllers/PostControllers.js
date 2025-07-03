import PostModel from "../models/postModel.js";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
const addPost = async (req,res) => {
    try {
        const {title,content,createdAt} = req.body;
        const image = req.files || []; 
        let imageUrls = [];
        if (image.length > 0) {
            imageUrls = await Promise.all(
                image.map(async (item) => {
                    try {
                        if (!fs.existsSync(item.path)) {
                            console.error("File not found:", item.path);
                            return null;
                        }

                        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                        fs.unlinkSync(item.path); // Delete temporary file after upload
                        return result.secure_url;
                    } catch (uploadError) {
                        console.error("Cloudinary Upload Error:", uploadError);
                        return null; // Handle failed uploads gracefully
                    }
                })
            );
            imageUrls = imageUrls.filter(url => url !== null); // Remove null values
        }
        console.log(imageUrls);
        const postData = new PostModel({
            title,
            content,
            createdAt,
            image:imageUrls
        })
        await postData.save();
        res.json({success:true, message:"Adding Post", postData})
    } catch (error) {
        console.error("Error Adding Trainer:", error);
        res.status(500).json({ success: false, message: "Error in adding Post" });
    }
}

const listPost = async (req,res) => {
    try {
        const data = await PostModel.find({});
    res.json({success:true, message:"Listing the posts", data})
    } catch (error) {
        console.error("Error In Listing Post", error);
        res.json({success:false, message:"Error in the Listing"})
    }
}
const updatePost = async (req, res) => {
    const { id } = req.params;

    try {
        const { title, content, createdAt } = req.body;
        const image = req.files || [];

        // Find the post by ID
        let post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        let imageUrls = post?.image || [];

        if (image.length > 0) {
            // Upload new images to Cloudinary
            let newImageUrls = await Promise.all(
                image.map(async (item) => {
                    try {
                        if (!fs.existsSync(item.path)) {
                            console.error("File not found:", item.path);
                            return null;
                        }

                        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });

                        fs.unlinkSync(item.path); // Delete temporary file after upload
                        return result.secure_url;
                    } catch (uploadError) {
                        console.error("Cloudinary Upload Error:", uploadError);
                        return null;
                    }
                })
            );

            newImageUrls = newImageUrls.filter(url => url !== null);
            if (newImageUrls.length > 0) {
                imageUrls = newImageUrls;
            }
        }

        const updateFields = { title, content, createdAt };
        if (imageUrls.length > 0) updateFields.image = imageUrls;

        // Update post details
        const updatedPost = await PostModel.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({ success: true, post: updatedPost, message: "Post updated successfully" });
    } catch (error) {
        console.error("Error in Updating Post:", error);
        res.status(500).json({ success: false, message: "Error in updating post" });
    }
};
const deletePost = async (req,res) => {
    const {id} = req.params;
    try {
        const post = await PostModel.findByIdAndDelete(id);
        res.json({success:true,message:"Deleting Post ",post})
    } catch (error) {
        console.error("Error In Deleting Post", error);
        res.json({success:false, message:"Error in the Deleting"})
    }
}

export {addPost,listPost,updatePost,deletePost}