const express = require("express");
const router = express.Router();
const { useSocket } = require("../middleware/socket");
const cartoonController = require("../controllers/cartoons");
const userController = require("../controllers/user");

const { requiresAuth } = require("express-openid-connect");

router.get("/", useSocket, cartoonController.getCartoos);
router.post("/:id", requiresAuth(), cartoonController.vote);

router.post("/user/reload", requiresAuth(), userController.vote);

module.exports = router;
