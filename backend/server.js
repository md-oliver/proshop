import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res, next) => {
    res.send("Running");
});

app.get("/api/products", (req, res, next) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res, next) => {
    const product = products.find((prod) => prod._id === req.params.id);
    res.json(product);
});

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});
