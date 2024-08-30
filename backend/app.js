const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const stuffRoutes = require("../backend/routes/stuff");
const app = express();

app.use(express.json());

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
    "mongodb+srv://dj06700:kKlcEfnnOMGqPErj@cluster0.7s2zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/api/auth", userRoutes);
app.use("/api/books", stuffRoutes);

/*
app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

/*
app.use("/api/books", (req, res, next) => {
  const books = [
    {
      userId: "Jean",
      title: "Le monde des autres",
      author: "Pierre de la pale",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      year: 1992,
      genre: "Nostalgique",
      ratings: [
        {
          userId: "Yves",
          grade: 6,
        },
      ],
      averageRating: 5,
    },
  ];
  res.status(200).json(stuff);
});*/

module.exports = app;
