const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN;

function verifyToken(req, res, next) {
  console.log("cookies", req.cookies);
  const token = req.cookies.authToken;

  console.log("token", token);
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded.userId) {
      return res.status(401).redirect("/login");
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).redirect("/login");
  }
}

module.exports = { verifyToken };

/* const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN;

function verifyToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).redirect("/login");
  }
}
module.exports = { verifyToken };
 */
