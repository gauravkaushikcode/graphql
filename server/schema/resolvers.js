const _ = require("lodash");
const { UserList, MovieList } = require("../FakeData");
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, { id }) => {
      return _.find(UserList, { id: Number(id) });
    },
    friends: (parent, { id }) => {
      return _.find(UserList, { id: Number(id) })?.friends;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      return _.find(MovieList, { name });
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2009);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1]?.id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUserName: (parent, args) => {
      const { id, newUserName } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUserName;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (parent, { id }) => {
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
