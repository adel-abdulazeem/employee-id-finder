const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const cors = require("cors")
const cron = require("node-cron");

const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const medicationRoutes = require("./routes/medications");

const allowedOrigins = [
  'http://localhost:5173', 
  'https://medi-prep-manage.netlify.app'
]; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
// Passport config
require("./config/passport")(passport);
//Connect To Database
connectDB();
//Static Folder
app.use(express.static("public"));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Logging
app.use(logger("dev"));
// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Use flash messages for errors, info, ect...
app.use(flash());
//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/medication", medicationRoutes);
// Function to check server health
const checkServerHealth = async () => {
  try {
    const response = await fetch(`https://medi-prep-manage.netlify.app`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Server health check successful:", data);
  } catch (error) {
    console.error("Server health check failed:", error.message);
  }
};
// Schedule health check every 14 minutes
cron.schedule("*/14 * * * *", () => {
  console.log("Running health check...");
  checkServerHealth();
});

let port = process.env.PORT || 4000
//Server Running
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${port}`);
});
 