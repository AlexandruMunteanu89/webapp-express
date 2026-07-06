function setImagePath(req, res, next) {
  req.imagePath = `${req.protocol}://${req.get('host')}/movies/`;
  next()
};

module.exports = setImagePath;