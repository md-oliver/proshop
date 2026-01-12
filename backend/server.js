import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.get("/", (req, res, next) => {
    res.send("Running");
});

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});
