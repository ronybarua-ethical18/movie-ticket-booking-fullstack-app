const { UserInputError, AuthenticationError } = require("apollo-server");
const { verifyToken } = require("../../utilities/verifyToken");
const Movie = require("../../models/Movie");

module.exports = {
  Mutation: {
    createComment: async (_, { movieId, body }, context) => {
      const { username } = verifyToken(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const movie = await Movie.findById(movieId);

      if (movie) {
        movie.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await movie.save();
        return movie;
      } else
        throw new UserInputError("Movie is not found", {
          errors: "Movie is not found",
        });
    },
    deleteComment: async (_, { movieId, commentId }, context) => {
      const { username } = verifyToken(context);

      const movie = await Movie.findById(movieId);

      if (movie) {
        const commentIndex = movie.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (movie.comments[commentIndex].username === username) {
          movie.comments.splice(commentIndex, 1);
          await movie.save();
          return movie;
        } else {
          throw new AuthenticationError(
            "You are not allowed to perform the action",
            { errors: "You are not allowed to perform the action" }
          );
        }
      }else{
          throw new UserInputError("Movie is not found")
      }
    },
  },
};
