const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
exports.signup =  async (req, res) => {

    const requestBody = req.body;

    const userObj={
        name: requestBody.name,
        userId: requestBody.userId,
        password: bcrypt.hashSync(requestBody.password, 10),
        email: requestBody.email,
        userType: requestBody.userType
    }
    try{

        const user = await User.create(userObj);

        const res_obj = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            createdAt : user.createdAt,
            updateAt : user.updatedAt
        }
        res.status(201).send(res_obj);
    }catch(err){
        console.log("Error while registering user", err)
        res.status(500).send({ message: "Error while registering user" });
    }
  
}

