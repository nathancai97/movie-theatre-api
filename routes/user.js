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
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

// router.get("/:id/shows", async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     const shows = await Show.findAll();

// })

module.exports = router;
