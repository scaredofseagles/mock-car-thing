const express = require("express");

const router = express.Router();
const { authorize, callback, refreshToken } = require("../../controllers/authentication/authController");

router.get("/authorize", authorize);

router.get("/callback", callback);

router.get("/refresh", refreshToken);

module.exports = router;
