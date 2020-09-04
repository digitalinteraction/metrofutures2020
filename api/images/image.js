require('dotenv').config()

let options = {
  cam: 0,
  opt0: 0,
  opt1: 0,
  opt2: 0,
  opt3: 0,
  opt4: 0,
  opt5: 0
}

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      // Get options from the get request 
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

function urlFormatter(options) {
  // Pass in object of all options
  console.log(options);
}