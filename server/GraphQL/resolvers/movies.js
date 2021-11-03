const { UserInputError } = require("apollo-server");
const Movie = require("../../models/Movie");

const { validMovieInput } = require("../../utilities/formValidation");
const { verifyToken } = require("../../utilities/verifyToken");

module.exports = {
  Query: {
    async getMovies() {
      try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        return movies;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMovie(_, { movieId }) {
      try {
        const movie = await Movie.findById(movieId);
        if (movie) {
          return movie;
        } else {
          throw new Error("movie not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addMovie(
      _,
      {
        movieInput: {
          title,
          imgTitle,
          img,
          desc,
          year,
          genre,
          trailer,
          video,
          isSeries,
          limit,
        },
      },
      context
    ) {
      const user = verifyToken(context);
      const { errors, valid } = validMovieInput(
        title,
        desc,
        year,
        imgTitle,
        genre
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const movie = await Movie.findOne({ title });

      if (movie) {
        throw new UserInputError("Error", {
          error: "The title is already exist",
        });
      }
      const newMovie = new Movie({
        id: user.id,
        user: user.username,
        title,
        imgTitle,
        img,
        desc,
        year,
        genre,
        trailer,
        video,
        limit,
        isSeries,
        createdAt: new Date().toDateString(),
      });

      const response = await newMovie.save();

      return response;
    },
  },
};
