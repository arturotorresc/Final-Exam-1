const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const errorHandler = require("./middleware/errorHandler");
const { Movies } = require("./models/movie-model");
const { Actors } = require("./models/actor-model");

const app = express();

app.use(jsonParser);

app.patch("/api/delete-movie-actor/:movie_ID", errorHandler, (req, res) => {
  const { movie_ID } = req.params;
  Movies.removeActorFromMovieList(
    movie_ID,
    req.body.firstName,
    req.body.lastName
  )
    .then((updatedMovie) => {
      res.status(201).json({ movie: updatedMovie });
    })
    .catch((err) => {
      res.statusMessage = err.message;
      res.status(500).end();
    });
});

app.post("/api/create-actor", (req, res) => {
  Actors.createActor({ ...req.body })
    .then((actor) => res.json({ actor }))
    .catch((err) => {
      res.status(500).end();
    });
});

app.get("/api/actors", (req, res) => {
  Actors.getAll()
    .then((actors) => {
      res.json({ actors });
    })
    .catch((err) => {
      res.status(500).end();
    });
});

app.post("/api/movies", (req, res) => {
  Movies.createMovie({ ...req.body })
    .then((movie) => res.json({ movie }))
    .catch((err) => {
      res.status(500).end();
    });
});

app.get("/api/movies", (req, res) => {
  Movies.getAll()
    .then((movies) => {
      res.json({ movies });
    })
    .catch((err) => {
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
