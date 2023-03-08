const express = require("express");
const router = express.Router();
const { Show } = require("../models/Show");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
})

router.get("/genres", async (req, res) => {
    res.status(401).json(req)
})

module.exports = router;
