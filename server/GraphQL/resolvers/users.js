const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const {
  validateRegisterInput,
  validLoginInput,
} = require("../../utilities/formValidation");
const { tokenGenerator } = require("../../utilities/tokenGenerator");

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = `User not found`;
        throw new UserInputError("Error", { errors });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = `Wrong credentials`;
          throw new UserInputError("Error", { errors });
        }
      }
      const token = tokenGenerator(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      const userEmail = await User.findOne({ email });

      if (user) {
        throw new UserInputError("username is already taken", {
          errors: {
            username: `username is already taken`,
          },
        });
      }
      if (userEmail) {
        throw new UserInputError("email is already taken", {
          errors: {
            email: `email is already taken`,
          },
        });
      }
      password = await bcrypt.hash(password, 13);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = tokenGenerator(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
