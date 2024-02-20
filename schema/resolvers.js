const _ = require("lodash");
const { UserList } = require("../FakeData");
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
  },
};

module.exports = { resolvers };
