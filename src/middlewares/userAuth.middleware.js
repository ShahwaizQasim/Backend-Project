import { UserModel } from "../modules/users/models/user.model.js";
import { ENV } from "../constant.js";
import jwt from "jsonwebtoken"

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(404).send({ status: 404, msg: "Token Not Found", error: true })
        }
        const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
        console.log("decoded", decoded);

        if (!decoded) {
            res.status(404).send({ status: 404, msg: "Invalid Access Token", error: true })
        }
        const user = await UserModel.findById(decoded._id).select("-password -refreshToken");
        req.user = user;
        next()
        // return res.status(200 ).send({ status: 200, msg: "user Login successfully" })
    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })
    }
}

export {
    verifyUser
}
