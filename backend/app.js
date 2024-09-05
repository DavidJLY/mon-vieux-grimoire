require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const userRoutes = require("./routes/user");
const stuffRoutes = require("../backend/routes/stuff");
const app = express();

//limit number of request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: "draft-7",
});

app.use(limiter);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());

app.use(helmet());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//Mongoose connect
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOOSE_ID}:${process.env.MONGOOSE_MDP}@cluster0.7s2zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

//API routes
app.use("/api/auth", userRoutes);
app.use("/api/books", stuffRoutes);

module.exports = app;
