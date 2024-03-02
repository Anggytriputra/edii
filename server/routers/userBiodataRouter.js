const { userBiodataControllers } = require("../controllers");
const userBiodataRouter = require("express").Router();

userBiodataRouter.get("/:id", userBiodataControllers.getBiodata);
userBiodataRouter.get("/detail/:id", userBiodataControllers.getDetailBio);
userBiodataRouter.post("/", userBiodataControllers.createBiodata);
userBiodataRouter.patch("/:id", userBiodataControllers.updateBiodata);
userBiodataRouter.delete("/:id", userBiodataControllers.deleteBio);

module.exports = userBiodataRouter;
