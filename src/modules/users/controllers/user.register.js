

const AddUsers = async (req, res) => {
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
        const {userName, email, password, fullName} = req.body;
        console.log("Users Request=>", req.body);
        res.status(200).send({ status: 200, msg: "users added successfully", error: false })
    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })

    }
}

export {
    AddUsers
}