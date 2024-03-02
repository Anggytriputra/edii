const express = require("express");
const cors = require("cors");
// const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db.js");
const userBiodataRouter = require("./routers/userBiodataRouter.js");
const authRouters = require("./routers/authRouters.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/biodata", userBiodataRouter);
app.use("/api/auth", authRouters);

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
