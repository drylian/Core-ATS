
import dis from "@/controllers/Discord";
import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
  let discordping = undefined
  if (dis.client.isReady()) {
    discordping = dis.client.ws.ping
  }
  res.status(200).json({
    ping: new Date().getTime() - res.locals.ping,
    discord:discordping
  });
});
export default router;
