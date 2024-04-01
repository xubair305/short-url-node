const express = require("express");
const router = express.Router();

const URL = require("../models/url.models");
const { handleGenerateUrlStatic } = require("../controllers/url");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");

router.get("/", restrictToLoggedInUserOnly, async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("url", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/s/url", restrictToLoggedInUserOnly, handleGenerateUrlStatic);

module.exports = router;
