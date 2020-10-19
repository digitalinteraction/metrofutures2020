module.exports = async(req, res) => {
  sendResponse(req, res, 200, "");
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}