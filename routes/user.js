const express = require("express");
const router = express.Router();
const { User } = require("../models/index");
const { check, validationResult } = require("express-validator");
const { Show } = require("../models/index");

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

router.put("/:userId/shows/:showId", async (req, res) => {
  const { userId, showId } = req.params;
  try {
    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find User ${userId}` });
    }
    if (!show) {
      return res
        .status(404)
        .json({ message: `Cannot find Show ${showId}` });
    }

    await user.addShow(show);

    const updatedUser = await User.findByPk(userId, { include: Show });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot update User's show" });
  }
});

module.exports = router;
