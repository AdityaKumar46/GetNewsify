const express = require('express');
const router = express.Router();

router.get("/getnews", async(req, res) => {
  axios.get(path).then(
    (response) => {
        var result = response.data;
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
);
})


module.exports = router;