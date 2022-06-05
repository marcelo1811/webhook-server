import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import axios from "axios";
import express from "express";

// express server
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(async (req, res, next) => {
  try {
    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
    const method = req.method.toLowerCase();
    const path = req.path;
    const response = await axios[method](`${webhookUrl}${path}`, {
      ...req.body,
    });
    return res.send(response.data);
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
