//Defines a policy to check if a user is authenticated with passport
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
};
