const { DateTypeDefinition } = require("graphql-scalars");
const { gql } = require("apollo-server");
const locationSchema = require("../models/Location");

const typeDefs = gql`
  scalar Date
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    address: String
    createdAt: String!
    profileAvatar: String
    aboutMe: String
    websiteUrl: String
    number: String!
    email: String!
    bookmarks: [Event]
    myEvents: [Event]
    events: [Event]
    reviews: [Review]
  }

  type LocationEvent {
    buildingNumber: String
    streetName: String
    cityName: String
    county: String
    latitude: String
    longitude: String
    state: String
    postcode: String
    eventId: String
  }

  input Location {
    buildingNumber: String
    streetName: String
    cityName: String
    county: String
    latitude: String
    longitude: String
    state: String
    postcode: String
    eventId: String
  }

  type Event {
    _id: ID!
    #username: String
    eventName: String
    location: LocationEvent
    description: String
    date: String
    price: Int
    ageGroup: String!
    createdById: User!
    images: [Image]
    tags: [Tag]
    reviews: [Review]
    attendees: Int!
    maxAttendees: Int!
  }
  input inputEvent {
    _id: ID!
  }

  type Tag {
    _id: ID!
    tagName: String!
    events: [Event]
  }
  type Tag {
    _id: ID!
    tagName: String!
    events: [Event]
  }

  type Review {
    _id: ID!
    username: String
    title: String
    reviewText: String
    rating: Int
    postedBy: ID!
    associatedEvent: Event!
  }

  type Image {
    imageLink: String!
  }

  input InputImage {
    imageLink: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    events: [Event]
    event(eventId: ID!): Event
    tags: [Tag]
    tag(tagId: ID!): Tag
    review(reviewId: ID!): Review
    reviews: [Review]
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    username: String!
    number: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateReviewInput {
    postedBy: ID
    username: String
    title: String!
    reviewText: String!
    rating: Int
    eventId: ID
  }
  input CreateEventInput {
    eventName: String!
    location: Location
    description: String
    date: String!
    price: Int
    ageGroup: String
    images: [InputImage]
    tags: [ID]
    maxAttendees: Int!
  }
  type Mutation {
    createUser(input: CreateUserInput!): Auth
    login(input: LoginInput!): Auth
    createReview(input: CreateReviewInput!): Review
    createEvent(input: CreateEventInput!): Event
    deleteUser(userId: ID!): User
    deleteReview(reviewId: ID!): Review
    purchaseTicket(eventId: ID!): Event
    bookmarkEvent(eventId: ID!): Event
    unBookmarkEvent(eventId: ID!): Event
    # deleteEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
