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
};

module.exports = { resolvers };
