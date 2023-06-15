import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import mongo from "./mongodb/index.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import conversationsRoutes from "./routes/conversations.js";
import messageRoutes from "./routes/messages.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import socketIO from "./socket.js";

//todo: configure

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }));
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // Sử dụng middleware để phân tích dữ liệu định dạng JSON và x-www-form-urlencoded
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// todo: file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//todo: routes with file
// app.post("/auth/register", upload.single("picture", register));
app.post("/auth/register", register);
app.post("/posts", verifyToken, upload.single("file"), createPost);

//todo: routes
app.use("/auth", authRoutes);
app.use("/user", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/conversation", conversationsRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 6001;

//todo: mongoose setup
mongo();

const server = app.listen(PORT, () => console.log("Connect to:", PORT));
socketIO(server);
