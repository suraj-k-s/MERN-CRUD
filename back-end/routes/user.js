const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { application } = require("express");

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  const data = await user.save();
  res.json(data);
});

router.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const removedUser = await User.deleteOne({ _id: req.params.id });
  res.json(removedUser);
});
 
router.patch("/:id", async (req, res) => {
  const updateUser = await User.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name } }
  );
  res.json(updateUser);
});

module.exports = router;
