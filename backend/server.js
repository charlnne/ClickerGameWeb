import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "db.json");

const app = express();
app.use(cors());
app.use(express.json());

const readDb = async () => JSON.parse(await readFile(DB_PATH, "utf-8"));
const writeDb = async (db) => writeFile(DB_PATH, JSON.stringify(db, null, 2));

app.get("/users", async (_req, res) => {
  const db = await readDb();
  res.json(db.users);
});

app.post("/users/register", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });

  const db = await readDb();
  if (db.users.some((u) => u.username === username)) {
    return res.status(409).json({ error: "username already taken" });
  }

  const user = {
    id: db.nextId,
    username,
    points: 0,
    clickPower: 1,
    unlockedAutoClicker: false,
  };
  db.users.push(user);
  db.nextId += 1;
  await writeDb(db);
  res.status(201).json(user);
});

app.post("/users/login", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });

  const db = await readDb();
  const user = db.users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

app.put("/users/update", async (req, res) => {
  const { username, points, clickPower, unlockedAutoClicker } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });

  const db = await readDb();
  const user = db.users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "user not found" });

  if (typeof points === "number") user.points = points;
  if (typeof clickPower === "number") user.clickPower = clickPower;
  if (typeof unlockedAutoClicker === "boolean") user.unlockedAutoClicker = unlockedAutoClicker;

  await writeDb(db);
  res.json(user);
});

app.get("/users/:username", async (req, res) => {
  const db = await readDb();
  const user = db.users.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend ready at http://localhost:${PORT}`);
});
