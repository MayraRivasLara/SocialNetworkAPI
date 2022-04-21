const router = require("express").Router();
require('dotenv').config();

//Importing User and Thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

module.exports = router;
