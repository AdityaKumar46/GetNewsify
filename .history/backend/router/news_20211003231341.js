const express = require('express');
const router = express.Router();

router.get("/getnews", (req, res) => {
    res.send('Birds home page')
  })


  module.exports = router ;