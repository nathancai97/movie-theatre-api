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
    const shows = await Show.findAll({
      where: {
        UserId: id,
      },
    });
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get User's shows`);
  }
});

router.put("/:id/shows/:show", async (req, res) => {
  // try {
  // }
});

module.exports = router;
