const express = require("express");
const app = express();
const itemsRouter = require("./routes/itemsRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // Important for reading form data

app.use("/", itemsRouter);

app.listen(3000, () => console.log("Inventory App running on port 3000"));