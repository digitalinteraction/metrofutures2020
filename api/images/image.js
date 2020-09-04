require('dotenv').config()

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      if(true) {
        sendResponse(req, res, 200, returnObjects);
      } else {
        sendResponse(req, res, 400, "Unable to connect");
      }
    } catch (error) {
      sendResponse(req, res, 400, "Error");
    }
  }
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}