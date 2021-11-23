const express = require('express');
const router = express.Router();

router.get("/getnews", async(req, res) => {
  let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=9df18207f2434aff86ecc6f65b87c7c9'
  let data = await fetch(url);
  let parsedData = await data.json();
  res.send(parsedData);
})


module.exports = router;