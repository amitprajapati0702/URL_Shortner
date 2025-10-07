const express = require("express");
const { handlesignupdata, handlelogindata } = require("../controller/user");

const router = express.Router();

router.post("/",handlesignupdata);
router.post("/login",handlelogindata);
module.exports = router;