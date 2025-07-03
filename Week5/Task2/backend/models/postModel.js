import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    image: { type: Array,  },
    title: { type: String,  },
    content: { type: String,  },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });


const PostModel = mongoose.models.Post || mongoose.model("Post",PostSchema)
export default PostModel