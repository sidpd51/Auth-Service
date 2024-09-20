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

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(
                plainPassword,
                user.password
            );
            if (!passwordMatch) {
                console.log("Password doesn't match");
                throw { error: "Incorrect password" };
            }
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log("something went wrong in sigin process");
            throw { error };
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: "Invalid token" };
            }

            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: "No user with the corresponding token exists" };
            }
            return user.id;
        } catch (error) {}
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

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw { error };
        }
    }
}

module.exports = UserService;
