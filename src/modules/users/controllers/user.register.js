

const AddUsers = async (req, res) => {
    try {
        console.log("Users Request=>", req.body);
        res.status(200).send({ status: 200, msg: "users added successfully", error: false })
    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })

    }
}

export {
    AddUsers
}