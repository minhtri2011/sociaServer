import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
const postIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
const commentIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    location: "San Fran, CA",
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [userIds[1]],
    occupation: "Software Engineer",
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    location: "New York, CA",
    occupation: "Degenerate",
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    friends: [],
    location: "Canada, CA",
    occupation: "Data Scientist Hacker",
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    friends: [],
    location: "Korea, CA",
    occupation: "Educator",
  },
  {
    _id: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    friends: [],
    location: "Utah, CA",
    occupation: "Hacker",
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Journalist",
  },
  {
    _id: userIds[6],
    firstName: "Carly",
    lastName: "Vowel",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Nurse",
  },
  {
    _id: userIds[7],
    firstName: "Tri",
    lastName: "Nguyen",
    email: "minhtri@gmail.com",
    password: "123123123",
    picturePath: "p9.jpeg",
    friends: [userIds[0]],
    location: "LA",
    occupation: "D.E.V",
  },
];

export const posts = [
  {
    _id: postIds[0],
    userId: userIds[1],
    description: "Some really long random description",
    picturePath: "post1.jpeg",
    likes: [userIds[1], userIds[2]],
    comments: 0,
  },
  {
    _id: postIds[1],
    userId: userIds[3],
    description:
      "Another really long random description. This one is longer than the previous one.",
    picturePath: "post2.jpeg",
    likes: [userIds[1], userIds[3]],
    comments: 0,
  },
  {
    _id: postIds[2],
    userId: userIds[4],
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    picturePath: "post3.jpeg",
    likes: [userIds[4], userIds[2]],
    comments: 0,
  },
  {
    _id: postIds[3],
    userId: userIds[5],
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    picturePath: "post4.jpeg",
    likes: [userIds[0], userIds[2]],
    comments: 0,
  },
  {
    _id: postIds[4],
    userId: userIds[6],
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post5.jpeg",
    likes: [],
    comments: 0,
  },
  {
    _id: postIds[5],
    userId: userIds[7],
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post6.jpeg",
    likes: [userIds[0], userIds[4], userIds[1], userIds[2]],
    comments: 0,
  },
];

export const comments = [
  {
    _id: commentIds[0],
    body: "test comment",
    author: userIds[1],
    post: postIds[0],
  },
  {
    _id: commentIds[1],
    body: "test commen2sdfsdfsd",
    author: userIds[1],
    post: postIds[5],
  },
  {
    _id: commentIds[2],
    body: "test comment ec",
    author: userIds[3],
    post: postIds[5],
  },
  {
    _id: commentIds[3],
    body: "test comment blabla",
    author: userIds[5],
    post: postIds[0],
  },
];
