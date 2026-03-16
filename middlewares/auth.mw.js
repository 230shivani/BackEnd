const user_model = require('../models/user.model')
const verifySignupBody = async (req, res, next) => {
    try{

        if(!req.body.name){
            return res.status(400).send
            ({ message: "Name was not provided" });
        }
        if(!req.body.userId){
            return res.status(400).send
            ({ message: "UserId was not provided" });
        }
        if(!req.body.password){
            return res.status(400).send
            ({ message: "Password was not provided" });
        }
        if(!req.body.email){
            return res.status(400).send
            ({ message: "Email was not provided" });
        }
const user = await user_model.findOne({ userId: req.body.userId })
if(user){
    return res.status(400).send({ message: "UserId already exists" });
}   

next();

    }catch(err){
        console.log("Error while validating the request body", err)
        res.status(500).send({ 
            message: "Error while validating the request body" });       
    }}

    module.exports = {
        verifySignupBody : verifySignupBody
    }