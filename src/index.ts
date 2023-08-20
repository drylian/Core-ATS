import "./database/connect";

import express from "express";
import cors from "cors";
import api from "routes/api";
import Post from "database/models/Posts";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req, res) => {
  res.json({
    code: 404,
    message: "use routes POST /api/post or GET /api/post/:id",
  });
});

app.listen(8080, () => console.log(`Ligado: http://localhost:8080`));
