const router = require("express").Router();

const movieService = require("../services/movieService");

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", (req, res) => {
    const newMovie = req.body;

    movieService.create(newMovie);

    res.redirect("/");
});

router.get("/movies/:movieId", (req, res) => {
    const movieId = req.params;

    const movie = movieService.getOne(movieId);

    res.render("details");
});

module.exports = router;