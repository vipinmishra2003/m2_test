const staticRouter = require("express").Router();
const staticController = require("../Controllers/StaticController");
staticRouter.post("/staticList", staticController.staticList);
staticRouter.post("/staticView", staticController.staticView);
staticRouter.post("/staticEdit", staticController.staticEdit);
staticRouter.post("/staticActive/:_id/:status", staticController.staticActive);
staticRouter.post("/staticBlock/:_id", staticController.staticBlock);
module.exports = staticRouter;
