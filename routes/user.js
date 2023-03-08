const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/Show");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get User`);
  }
});

router.get("/:id/shows", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        include: [{ model: Show }]
    });
    const shows = await user.getShows();
    res.send(shows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get User's shows`);
  }
});

module.exports = router;
