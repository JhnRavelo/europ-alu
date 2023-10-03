const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async(req, res, next) => {

  const authHeader = await req.headers.authorization;
  
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("here error");
      return res.sendStatus(403);
    }
    req.user = decoded.userInfo.id;
    req.role = decoded.userInfo.role
    next();
  });
};

module.exports = verifyJWT;
