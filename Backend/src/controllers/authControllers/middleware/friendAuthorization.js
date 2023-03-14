const FriendAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "JWT token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (!decoded.isFriendAuthorized) {
      return res.status(403).send({ error: "Not authorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ error: "Invalid JWT token" });
  }
};
