import mongoose, { Schema } from "mongoose";



const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    uploadFile: {
        type: String, // cloudinary url
        required: true,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    views: {
        type: String,
        default: 0
    },
    duration: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
)

export const VideoModel = mongoose.model("Videos", VideoSchema);