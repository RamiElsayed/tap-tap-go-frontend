const { DateResolver } = require("graphql-scalars");
const user = require("./user");
const users = require("./users");
const event = require("./event");
const events = require("./events");
const search = require("./search");
const searchByCity = require("./searchByCity");
const tag = require("./tag");
const tags = require("./tags");
const review = require("./review");
const reviews = require("./reviews");
const createUser = require("./createUser");
const createEvent = require("./createEvent");
const createReview = require("./createReview");
const login = require("./login");
const deleteUser = require("./deleteUser");
const purchaseTicket = require("./purchaseTicket");
const bookmarkEvent = require("./bookmarkEvent");
const unBookmarkEvent = require("./unBookmarkEvent");
const deleteReview = require("./deleteReview");

const resolvers = {
  Date: DateResolver,
  Query: {
    user,
    users,
    event,
    events,
    tag,
    tags,
    review,
    reviews,
  },
  Mutation: {
    createUser,
    createEvent,
    createReview,
    login,
    deleteUser,
    purchaseTicket,
    bookmarkEvent,
    search,
    searchByCity,
    unBookmarkEvent,
    // deleteEvent,
    deleteReview,
  },
};

module.exports = resolvers;
