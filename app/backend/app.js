const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  url: "redis://redis:6379"
});

client.connect();

app.get("/", async (req, res) => {
  let visits = await client.get("visits");
  visits = visits ? parseInt(visits) + 1 : 1;
  await client.set("visits", visits);

  res.send(`Hello DevOps 🚀 Visits: ${visits}`);
});


app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

