const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).redirect("/login");
  }
}
module.exports = { verifyToken };