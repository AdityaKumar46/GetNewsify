const express = require('express');
const router = express.Router();

router.get("/getnews", async(req, res) => {
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
  let data = await fetch(url);
  let parsedData = await data.json();
  res.send(parsedData);
})


module.exports = router;