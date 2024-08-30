const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs").promises;

const port = 3000;

let storagePromise;

app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/recipes", async (_, res) => {
  const storage = await storagePromise;
  const recipes = Array.from(storage.entries()).map(([id, recipe]) => ({
    id,
    ...recipe,
  }));
  res.json(recipes);
});

app.get("/recipes/:id", async (req, res) => {
  const storage = await storagePromise;
  const recipe = storage.get(req.params.id);
  res.json({ id: req.params.id, ...recipe });
});

app.listen(port, () => {
  storagePromise = initMockStorage();
  console.log(`Server running at http://localhost:${port}`);
});

async function initMockStorage() {
  const initializedStorage = new Map();

  const filePromises = [
    fs.readFile(__dirname + "/public/images/homemade-acai-bowl-7.jpg"),
    fs.readFile(__dirname + "/public/images/Lemonade-Web-7.jpg"),
    fs.readFile(__dirname + "/public/images/Pumpkin-Soup.jpeg"),
  ];

  const [homemadeAcaiBowl, lemonade, pumpkinSoup] = await Promise.all(
    filePromises
  );

  initializedStorage.set("id_1", {
    description: "Berry Acai Bowl",
    imageBuffer: homemadeAcaiBowl.toString("base64"),
  });

  initializedStorage.set("id_2", {
    description: "Homemade Lemonade",
    imageBuffer: lemonade.toString("base64"),
  });

  initializedStorage.set("id_3", {
    description: "Pumpkin Soup",
    imageBuffer: pumpkinSoup.toString("base64"),
  });

  return initializedStorage;
}
