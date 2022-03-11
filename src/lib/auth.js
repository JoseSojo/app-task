module.exports = {
  isSessionOn(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signin');
  },

  isSessionOff(req, res, next){
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/profile');
  }
}
