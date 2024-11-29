import express from "express";
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 3030;

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import postRouter from "./routes/post.route";
app.use("/api/posts", postRouter);

import userRouter from "./routes/user.route";
app.use("/api/user", userRouter);

import commentRouter from "./routes/comment.route";
app.use("/api/comments", commentRouter);

app.all("*", (req, res) => {
  res.status(404).send({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

app.listen(PORT, () => {
  console.log(`\n Server is running on ${PORT}\n`);
});

export default app;
