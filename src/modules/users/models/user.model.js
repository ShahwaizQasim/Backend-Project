import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ENV } from "../../../constant.js";
import 'dotenv/config'

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  // cloudinary url
        required: true
    },
    coverImage: {
        type: String,  // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "VideoModel"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    }
)

// this hamesha apne surrounding context ko refer karta hai.

// JavaScript me this keyword ka use current context ke object ko refer karne ke liye hota hai. Ye depend karta hai ke this kis jagah
//  (global, function, object) me use ho raha hai.

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        ENV.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ENV.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        ENV.REFRESH_TOKEN_SECRET,
        {
            expiresIn: ENV.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const UserModel = mongoose.model("Users", UserSchema);