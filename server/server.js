const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/Users");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch(() => console.log("Error in Connecting Database"));

app.get("/api", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/getUsers/:id", async (req, res) => {
  try {
    const { id } = req.params; // const id = req.params.id;
    const user = await User.findById(id); // findById({_id: id})

    if (!user) {
      return res.status(404).json({ message: "User Not Found.." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/createUser", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, age });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    // Handle optional password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      rest.password = await bcrypt.hash(password, salt);
    }

    // Update user with remaining fields
    const updated = await User.findByIdAndUpdate(id, rest, { new: true });

    if (!updated) return res.status(404).json({ message: "User not found" });

    // Exclude password from response
    const { password: _, ...updatedUser } = updated.toObject();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
