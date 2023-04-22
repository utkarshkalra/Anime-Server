const express = require("express");
const mongoose = require("mongoose");
const Anime = require("../database/model");
const route = express.Router();

route.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  const { animeName, animeDescription, animeImage } = req.body;
  let anime = {};
  anime.animeName = animeName;
  anime.animeDescription = animeDescription;
  anime.animeImage = animeImage;

  let animeModel = new Anime(anime);
  await animeModel.save();
  res.json(animeModel);
});

route.get("/", async (req, res) => {
  const animes = await Anime.find();
  res.status(200).json(animes);
});

route.patch("/:id", async (req, res) => {
  try {
    const anime = await Anime.findByIdAndUpdate(req.params.id, req.body);
    if (!anime) throw Error("something wrong !!");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

route.delete("/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: " empty data " });
  }

  const id = req.params.id;
  Anime.findByIdAndDelete(id).then((data) => {
    if (!data) {
      res.status(404).send({ message: "cant delete" });
    } else {
      res.send({ message: "deleted" });
    }
  });
});

module.exports = route;
