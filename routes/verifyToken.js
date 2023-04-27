const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  // console.log("verify.js");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log("TOKEN ERRORRRR");
        return res.status(403).json("Token not valid!");
      }
      // console.log("1", data);
      if (data) {
        // console.log("2", data);
        req.user = await User.findById(data.id);
        // console.log(req.user);
        next(req);
      } else {
        return res.status(403).json("Token not valid!");
      }

      // console.log("GOT THE USER   ", req.user);
    });
  } else {
    return res.status(401).json("SORRY You don't have any token");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  // console.log("1");
  verifyToken(req, res, () => {
    // console.log(req);
    if (req.user.isAdmin) {
      // console.log("1");
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
