const access = (permitted) => {
  return (req, res, next) => {
    if (permitted.includes(req.body.role)) {
      next();
    } else {
      res.status(403).send({ msg: "Access Denied" });
    }
  };
};

module.exports = {
  access,
}