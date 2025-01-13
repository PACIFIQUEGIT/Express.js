module.exports = async function errorHandler(error, req, res, next) {
    const err = {...error};
    console.log(error);
    if(error?.message?.includes("Cast to ObjectId failed for value")) {
        error.message = "Invalid ID"
        error.statuscode = "400"
        return res.status(error.statuscode).json({error: error.message})
    }
    return res.status(error.statuscode ?? 500).json({error: error.message});
};