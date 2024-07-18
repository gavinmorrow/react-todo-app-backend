const express = require("express");
const app = express();
const port = 8080;

const DB = require("./db");
const db = new DB();

/**
 * @typedef {{ id: string, text: string, completed: boolean }} Item
 */

app.use((req, res, next) => {
  // so i dont need to set on the client
  if (req.headers["content-type"] !== "application/json") {
    // console.log("Not json:", req.headers["content-type"]);
    req.headers["content-type"] = "application/json";
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", [
    "Origin, X-Requested-With, Content-Type, Accept",
  ]);
  res.setHeader("Access-Control-Allow-Methods", [
    "GET",
    "POST",
    "PUT",
    "DELETE",
  ]);
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(express.json());

app.get("/", (_req, res) => {
  console.log("getting all items");
  res.send(db.items());
});

app.post("/", (req, res) => {
  const item = req.body;
  console.log("adding item", item.id);
  db.addItem(item);
  res.json(item).send();
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("getting item", id);
  const item = db.getItem(id);
  if (item == null) res.status(404);
  res.json(item);
});

app.put("/", (req, res) => {
  const newItem = req.body;
  console.log("updating item", newItem);
  db.setItem(newItem);
  res.status(204).send();
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("deleting item", id);
  db.deleteItem(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
