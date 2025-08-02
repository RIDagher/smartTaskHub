import express from "express";
import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smart Task Hub Backend!" });
})

// load environment variables
const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'postgres',
});

// test database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})