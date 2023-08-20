import Post from "database/models/Posts";
import express from "express";
import { IPost } from "interfaces/Database";
const api = express.Router();

api.use(express.json());

api.get("/post/:id", async (req, res) => {
  const id = req.params.id;

  res.json(await Post.findOne({ where: { id: id } }));
});
api.post("/post", async (req, res) => {
  const body: IPost = req.body;

  await Post.create({
    title: body.title,
    content: body.content,
  });

  res.json({
    code: 200,
    message: "Post created with success!",
  });
});

export default api;
