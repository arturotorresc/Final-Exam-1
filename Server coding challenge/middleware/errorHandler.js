const { Movies } = require("../models/movie-model");
const { Actors } = require("../models/actor-model");

async function errorHandler(req, res, next) {
  const { id } = req.body;
  if (!id) {
    res.statusMessage = "Id is missing in the body of the request";
    return res.status(406).end();
  }
  const { movie_ID } = req.params;
  if (movie_ID != id) {
    res.statusMessage = "id and movie_ID do not match";
    return res.status(409).end();
  }
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    res.statusMessage =
      "You need to send both firstName and lastName of the actor to remove from the movie list";
    return res.status(403).end();
  }
  let movie;
  let actor;
  try {
    movie = await Movies.getMovieById(movie_ID);
    actor = await Actors.getActorByName(firstName, lastName);
  } catch (err) {
    res.statusMessage = "An error ocurred while fetching movie and actor";
    return res.status(500).end();
  }
  if (!movie || !actor) {
    res.statusMessage = "The actor or movie do not exist";
    return res.status(404).end();
  }
  next();
}

module.exports = errorHandler;
