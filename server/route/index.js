const express = require("express");
const router = express.Router();

const middlewares = require("../js/middlewares");
const ctrl = require("./ctrl");

router.get("/logout", ctrl.logout);

router.get("/", middlewares.authenticateAccessToken, ctrl.getAddress);
router.get("/wallet", middlewares.authenticateAccessToken, ctrl.getAddress);
router.get("/send", middlewares.authenticateAccessToken, ctrl.getAddress);
router.get("/mmtsend", middlewares.authenticateAccessToken, ctrl.getAddress);
router.get("/history", middlewares.authenticateAccessToken, ctrl.getHistory);

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/send", ctrl.getSend);
router.post("/mmtsend", ctrl.getSend);
router.post("/refresh", ctrl.refresh);

router.delete("/delete", ctrl.iddelete);
module.exports = router;
