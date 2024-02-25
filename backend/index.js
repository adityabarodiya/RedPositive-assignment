const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const MONGODB_URI =
  "mongodb+srv://adityabarodiya:xJgDIkvrklyd04Mt@cluster0.m6xjsds.mongodb.net/courses";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a Mongoose schema
const dataSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  hobbies: String,
});
const Data = mongoose.model("Data", dataSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/data", async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json({ data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/data/:id", async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
