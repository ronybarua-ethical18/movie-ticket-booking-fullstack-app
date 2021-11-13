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
          img,
          duration,
          desc,
          trailer,
          year,
          limit,
          genre,
          isSeries,
        },
      },
      context
    ) {
      const user = verifyToken(context);
      const { errors, valid } = validMovieInput(
        title,
        desc,
        year,
        genre,
        duration,
        limit,
        isSeries
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const movie = await Movie.findOne({ title });

      if (movie) {
        throw new UserInputError("Errors", {
          errors: "The title is already exist",
        });
      }
      const newMovie = new Movie({
        title,
        desc,
        year,
        genre,
        duration,
        limit,
        isSeries,
        img,
        trailer,
        createdAt: new Date().toISOString(),
      });

      const response = await newMovie.save();

      return response;
    },
    likeMovie: async (_, { movieId }, context) => {
      const { username } = verifyToken(context);

      const movie = await Movie.findById(movieId);

      if (movie) {
        if (movie.likes.find((like) => like.username === username)) {
          //Movie is already liked so unlike it
          movie.likes = movie.likes.filter(
            (like) => like.username !== username
          );
        } else {
          movie.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await movie.save();
        return movie;
      }else throw new UserInputError('Movie not found', {errors: 'Movie not found'}) 
    },
  },
};
