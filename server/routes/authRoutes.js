const { Router } = require('express');
const router = Router();

const {
  signup,
  getCurrentUser,
  signin
} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

router.post("/register", signup);
router.post("/login", signin);
router.get("/user", authorization, getCurrentUser);

module.exports = router;
