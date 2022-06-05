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
    const url = webhookUrl + req.url;
    const method = req.method.toLowerCase();
    const body = req.body;
    const headers = { ...req.headers };
    // delete headers["content-length"];

    const config = {
      method,
      url,
      data: body,
      headers: {
        "content-type": headers["content-type"],
      },
    };
    const response = await axios(config);
    return res.status(200).send(JSON.stringify(response.data));
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
