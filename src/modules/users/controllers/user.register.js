import { uploadOnCloudinary } from "../../../utils/cloudinary.js";
import { UserModel } from "../models/user.model.js";

const RegisterUsers = async (req, res) => {
    try {

        // get user details from frontend
        // validation - not empty
        // check if user already exist: userName, email
        // check for images, check for avatar
        // upload them to cloudinary, avatar
        // create user object - create entry in db
        // remove password and refresh token field from response
        // check for user creation
        // return res

        const { userName, email, password, fullName } = req.body;
        if (
            [userName, email, password, fullName].some((field) => field?.trim() === "")
        ) {
            res.status(400).send({ status: 400, msg: "all fields are required", error: true })
        }
        const existedUser = await UserModel.findOne({
            $or: [{ userName }, { email }],
        })
        if (existedUser) {
            res.status(400).send({ status: 400, msg: "user with email and userName already exists", error: true })
        }

        // console.log("Avatar-File-Path", req.files);

        const avatarLocalPath = req.files?.avatar[0]?.path;
        // console.log("avatarLocalPath", avatarLocalPath);
        if (!avatarLocalPath) {
            res.status(400).send({ status: 400, msg: "File is required", error: true })
        }
        
        const coverImageLocalPath = req.files?.coverImage[0]?.path;
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if (!avatar) {
            res.status(400).send({ status: 400, msg: "File is required", error: true })
        }

        const user = await UserModel.create({
            fullName,
            email,
            userName: userName.toLowerCase(),
            avatar: avatar?.url,
            coverImage: coverImage?.url || "",
            password,

        });

        const createdUser = await UserModel.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            res.status(500).send({ status: 500, msg: "Something Went Wrong", error: true })
        }

        return res.status(201).send({ status: 201, msg: "user register successfully" })

    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })

    }
}

export {
    RegisterUsers
}