import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async (UserId) => {
    try {
        const user = await UserModel.findById(UserId);
        const AccessToken = user.generateAccessToken();
        const RefreshToken = user.generateRefreshToken();
        user.refreshToken = RefreshToken;
        await user.save({ validateBeforeSave: false })
        return { AccessToken, RefreshToken }
    } catch (error) {
        console.log(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        // req body -> data
        // userName or email
        // find the user
        // password check
        // access referesh token 
        // send cookie

        const { email, password } = req.body;

        if (!email && !password) {
            res.status(400).send({ status: 400, msg: "Email and Password is required", error: true })
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            let checkPassword = await user.isPasswordCorrect(password);
            if (checkPassword) {
                let { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(user._id);
                let loggedInUser = await UserModel.findById(user._id).select("-password -refreshToken");
                const options = {
                    httpOnly: true,
                    secure: true
                }
                return res
                    .status(200)
                    .cookie("AccessToken", AccessToken, options)
                    .cookie("RefreshToken", RefreshToken, options)
                    .send({ status: 200, msg: "user Login successfully", user: loggedInUser, AccessToken, RefreshToken })
            } else {
                return res.status(400).send({ status: 400, msg: "Incorrect Password", error: true })
            }
        } else {
            return res.status(404).send({ status: 404, msg: "User Not Found", error: true })
        }
    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })

    }
}

export {
    LoginUser
}