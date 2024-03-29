function logoutController(req, res) {
  res.cookie("userId", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).send({ message: "Logged out successfully!" });
}

module.exports = { logoutController };
