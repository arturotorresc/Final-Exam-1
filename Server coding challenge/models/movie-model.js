const mongoose = require("mongoose");
const { Actors } = require("./actor-model");

const moviesSchema = mongoose.Schema({
  movie_ID: {
    type: Number,
    unique: true,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actors",
      required: true,
    },
  ],
});

const moviesCollection = mongoose.model("movies", moviesSchema);

const Movies = {
  createMovie: function (newMovie) {
    return moviesCollection
      .create(newMovie)
      .then((createdMovie) => {
        return createdMovie;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getMovieById: function (movie_ID) {
    return moviesCollection
      .findOne({ movie_ID })
      .then((movie) => movie)
      .catch((err) => {
        throw new Error(err);
      });
  },
  removeActorFromMovieList: function (movie_ID, firstName, lastName) {
    return Actors.getActorByName(firstName, lastName)
      .then(async (actor) => {
        if (!actor) {
          return Promise.reject(false);
        } else {
          const movie = await moviesCollection.findOne({ movie_ID });
          movie.actors = movie.actors.filter((actorId) => {
            return actorId.toString() !== actor._id.toString();
          });
          await movie.save();
          return moviesCollection.findOne({ movie_ID }).populate("actors");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getAll: function () {
    return moviesCollection.find({}).populate("actors");
  },
};

module.exports = {
  Movies,
};
