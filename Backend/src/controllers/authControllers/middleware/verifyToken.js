const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN;

function verifyToken(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).send({ error: "Authorization header missing" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded.userId) {
      return res.status(401).redirect("/");
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).redirect("/");
  }
}

module.exports = { verifyToken };
