const express = require("express");
const { Handlesorturl, handlesignup, handlegetdata } = require("../controller/url");

const router = express.Router();

router.post("/" ,Handlesorturl );
router.get("/:sortid",handlegetdata);


router.get('/favicon.ico', (req, res) => res.status(204).end());


module.exports = router;