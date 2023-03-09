const express = require("express");
const router = express.Router();
const { Show } = require("../models/index");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get Shows`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get Show`);
  }
});

router.get("/genres/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const shows = await Show.findAll({
      where: { genre },
    });
    res.status(401).json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Cannot get Genre`);
  }
});

router.put(
  "/:id/watched",
  [check("rating").not().isEmpty().trim()],
  async (req, res) => {
    try {
      const show = await Show.findByPk(req.params.id);
      await show.update({ rating: `Watched, rating: ${req.body.rating}` });
      res.json(show);
    } catch (error) {
      console.error(error);
      res.status(500).send("Cannot update a show's rating");
    }
  }
);

router.put(
  "/:id/updates",
  [
    check("status").not().isEmpty().trim(),
    check("status").isLength({ min: 5, max: 25 }),
  ],
  async (req, res) => {
    try {
      const show = await Show.findByPk(req.params.id);
      show.status === "on-going"
        ? show.update({ status: "cancelled" })
        : show.update({ status: "on-going" });
      res.json(show);
    } catch (error) {
      console.error(error);
      res.status(500).send("Cannot update a show's status");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Show.destroy({
      where: { id },
    });
    const foundShow = await Show.findByPk(id);
    if (!foundShow) {
      res.status(200).send("Show deleted successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Cannot delete a show");
  }
});
module.exports = router;
