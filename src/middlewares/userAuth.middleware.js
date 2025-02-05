

const verifyUser = (req, res, next) => {
    try {
        next()
        // return res.status(200).send({ status: 200, msg: "user Login successfully" })
    } catch (error) {
        res.status(400).send({ status: 400, msg: error.message, error: true })
    }
}

export {
    verifyUser
}
