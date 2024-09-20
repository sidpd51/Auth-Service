const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "",
            err: "Email or password missing in the request",
        });
    }
    next();
};

const validateIsAdminRequest = (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            message: "",
            err: "UserId is missing in the request",
        });
    }
}

module.exports = {
    validateUserAuth,
};
