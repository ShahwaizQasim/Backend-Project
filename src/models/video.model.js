import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

//1) Conclusion
// Mongoose aggregation plugin ka use hum is liye karte hain taky data processing ko efficient, reusable, aur maintainable banane ke liye hota hai.Iska
// benefit zyada tab hota hain jab aap ke paas repetitive queries ya advanced aggregation logic ho jo multiple jagah use ho rhi ho.

//2) Mongoose aggregation pipeline ka plugin is liye banate hain takay:

// Reusability: Ek aggregation logic baar-baar likhne ki zarurat na ho, ek hi place se use ho.
// Simplified Code: Queries short aur clean ho jayein.
// Schema Specific Logic: Har schema apne rules ke saath custom aggregation kar sake.
// Maintenance Asaan Ho: Agar aggregation me koi change karna ho, to sirf plugin update karna pade.

VideoSchema.plugin(mongooseAggregatePaginate);

export const VideoModel = mongoose.model("Videos", VideoSchema);