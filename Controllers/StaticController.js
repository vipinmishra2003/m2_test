const staticModel = require("../Models/staticModel");
module.exports = {
  staticList: (req, res) => {
    try {
      staticModel.find(
        { status: { $in: ["ACTIVE", "BLOCK"] } },
        (error, result) => {
          if (error) {
            return res.send({
              resopnseCode: 500,
              resopnseMessage: "Internal Server Error",
            });
          } else if (result.lenght == 0) {
            return res.send({
              resopnseCode: 404,
              resopnseMessage: "Static data is not exist",
            });
          } else {
            return res.send({
              resopnseCode: 200,
              responseMessage: "Details of fetched data ",
              resopnseResult: result,
            });
          }
        }
      );
    } catch (error) {
      return res.send({
        resopnseCode: 501,
        resopnseMessage: "Something went wrong",
        resopnseResult: error,
      });
    }
  },
  staticView: (req, res) => {
    try {
      var query = {
        $and: [
          { $or: [{ type: req.query.type }, { title: req.query.title }] },
          { status: { $in: ["ACTIVE", "BLOCK"] } },
        ],
      };
      staticModel.findOne(query, (error, resutl) => {
        if (resutl == null) {
          return res.send({
            resopnseCode: 404,
            resopnseMessage: "Static data not found",
          });
        } else {
          return res.send({
            responseCode: 200,
            responseMessage: "Details of fetched static data ",
            resopnseResult: resutl,
          });
        }
      });
    } catch (error) {
      return res.send({
        resopnseCode: 501,
        resopnseMessage: "Something went wrong",
        resopnseResult: error,
      });
    }
  },
  staticEdit: (req, res) => {
    staticModel.findOne(
      { type: req.body.type, status: "ACTIVE" },
      (error, result) => {
        if (error) {
          return res.send({
            resopnseCode: 500,
            responseMessage: "Internal Server error",
          });
        } else if (!result) {
          return res.send({
            resopnseCode: 404,
            responseMessage: "Data not found ",
          });
        } else {
          staticModel.findByIdAndUpdate(
            { _id: result._id },
            {
              $set: {
                title: req.body.title,
                description: req.body.description,
              },
            },
            { new: true },
            (updateErr, updateRes) => {
              if (updateErr) {
                return res.send({
                  resopnseCode: 500,
                  responseMessage: "Internal Server error",
                });
              } else {
                return res.send({
                  resopnseCode: 200,
                  responseMessage: "Successfully static data edit ",
                  resopnseResult: updateRes,
                });
              }
            }
          );
        }
      }
    );
  },
  staticActive: (req, res) => {
    staticModel.findOne(
      { _id: req.params._id, status: req.params.status },
      (error, result) => {
        if (error) {
          return res.send({
            resopnseCode: 500,
            responseMessage: "Internal Server error",
          });
        } else if (!result) {
          return res.send({
            responseCode: 404,
            responseMessage: "Data is not found",
          });
        } else {
          if (result.status == "ACTIVE") {
            staticModel.findByIdAndUpdate(
              { _id: result._id },
              { $set: { status: "BLOCK" } },
              { new: true },
              (updateErr, updateRes) => {
                if (updateErr) {
                  return res.send({
                    responseCode: 500,
                    responseMessage: "Internal server error",
                  });
                } else {
                  return res.send({
                    responseCode: 200,
                    responseMessage: "Block successfully",
                    resopnseResult: updateRes,
                  });
                }
              }
            );
          } else {
            return res.send({
              responseCode: 409,
              responseMessage: "Already Block",
            });
          }
        }
      }
    );
  },
  staticBlock: (req, res) => {
    staticModel.findOne({ _id: req.params._id }, (error, result) => {
      if (error) {
        return res.send({
          resopnseCode: 500,
          responseMessage: "Internal Server error",
        });
      } else if (!result) {
        return res.send({
          responseCode: 404,
          responseMessage: "Data is not found",
        });
      } else {
        if (result.status == "BLOCK") {
          staticModel.findByIdAndUpdate(
            { _id: result._id },
            { $set: { status: "ACTIVE" } },
            { new: true },
            (updateErr, updateRes) => {
              if (updateErr) {
                return res.send({
                  responseCode: 500,
                  responseMessage: "Internal server error",
                });
              } else {
                return res.send({
                  responseCode: 200,
                  responseMessage: "Active successfully",
                  resopnseResult: updateRes,
                });
              }
            }
          );
        } else {
          return res.send({
            responseCode: 409,
            responseMessage: "Already ACTIVE",
          });
        }
      }
    });
  },
};
