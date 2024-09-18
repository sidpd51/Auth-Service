const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: 3600,
            });
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw { error };
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token verification");
            throw { error };
        }
    }

    checkPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw { error };
        }
    }
}

module.exports = UserService;
