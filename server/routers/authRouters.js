const { authControllers } = require("../controllers");
const authRouters = require("express").Router();

authRouters.post("/register", authControllers.register);
authRouters.post("/login", authControllers.login);
authRouters.get("/v1", authControllers.getUserByToken);

module.exports = authRouters;
