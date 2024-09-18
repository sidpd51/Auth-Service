const express = require("express");
const bodyParser = require("body-parser");
const { PORT, JWT_KEY } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require('./repository/user-repository')
const UserService = require('./services/user-service')

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRoutes);
    app.listen(PORT, async() => {
        console.log(`App is listen on port no:${PORT}`);
        // const repository = new UserRepository()
        // const res = await repository.getById(1)
        // console.log(res)
        const user = new UserService()
        // const newToken = user.createToken({email:'sidpd@gmail.com',id:1})
        // console.log(newToken)
        // const result = user.verifyToken(newToken,JWT_KEY)
        // console.log(result)

        console.log(user.checkPassword("123@123","$2b$10$SMrSsXFWBXuj6RVvYNXEOeVKVmsOy4jYE6NdpJFqjdjhiPxUV3oT."))
    });
};

prepareAndStartServer();
