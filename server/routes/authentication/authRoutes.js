const express = require("express");
const router = express.Router();
const { authorize } = require("../../controllers/authentication/authController")

router.get("/", authorize);

module.exports = router;