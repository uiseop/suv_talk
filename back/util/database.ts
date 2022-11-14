import { Sequelize } from "sequelize";

const sequelize = new Sequelize("suv_talk", "root", "1234", {
    dialect: "mysql",
    host: "localhost",
});

export default sequelize;
