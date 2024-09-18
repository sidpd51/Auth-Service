const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");
const jwt = require('jsonwebtoken')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw { error };
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{
                expiresIn: 3600
            })
            return result
        } catch (error) {
            console.log("something went wrong in service layer");
            throw { error };
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY)
            return response
        } catch (error) {
            console.log("something went wrong in service layer");
            throw { error };
        }
    }
}

module.exports = UserService;
