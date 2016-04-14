module.exports = {
  index: function(req, res) {
    res.sendfile(__dirname, 'index.html');
  }
};
