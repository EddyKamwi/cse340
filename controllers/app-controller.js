const path = require("path")
const indexFile = path.join(__dirname,"../views/index.html")

class AppController {
  static index = (req, res) => {
    res.sendFile(indexFile);
  };
}

module.exports = AppController;
