const express = require("express");
const bodyParser = require("body-parser");
const { PORT, JWT_KEY } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const UserService = require("./services/user-service");
const db = require("./models/index");
const {User,Role} = require('./models/index')

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`App is listen on port no:${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }

        const u1 = await User.findByPk(9)
        const r1 = await Role.findByPk(2)
        // u1.addRoles(r1)
        const response = await u1.getRoles()

        console.log(response)
    });
};

prepareAndStartServer();
