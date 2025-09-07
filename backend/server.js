const express= require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// import models to sync to database
const db = require('./models');
const sequelize = db.sequelize;

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/user.routes.js');
const projectRoutes = require('./routes/project.routes.js');
const projectMemberRoutes = require('./routes/projectMember.routes.js');
const taskRoutes = require('./routes/task.routes.js')

app.use('/api', userRoutes, projectRoutes, projectMemberRoutes, taskRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smart Task Hub Backend!" });
})

// // load environment variables
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   logging: false, // optional: disable verbose logs
// });




// Test DB connection and sync models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.sync(); // This recreates all tables — use with caution
    console.log("✅ All models synced to the database.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
};

startServer();
