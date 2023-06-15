import mongoose from "mongoose";
// import { posts, users, comments } from "./data/index.js";
// import Post from "./models/post.js";
// import User from "./models/user.js";
// import Comment from "./models/comment.js";
const mongo = () => {
  return mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Sử dụng URL mới cho quá trình phân tích cú pháp
      useUnifiedTopology: true, // Sử dụng Topology mới được giới thiệu từ phiên bản MongoDB 3.6 để giải quyết vấn đề liên quan đến kết nối
    })
    .then(() => {
      //todo: fake data to mongodb
      // User.insertMany(users);
      // Post.insertMany(posts);
      // Comment.insertMany(comments);
    })
    .catch((err) => {
      console.log(`${err} did not connect to ${PORT}`);
    });
};
export default mongo;
