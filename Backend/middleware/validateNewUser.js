
const validateNewUser = (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name ||!email ||!password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({
            message: "Invalid email address"
        });
    }
    next();
};

module.exports = validateNewUser;