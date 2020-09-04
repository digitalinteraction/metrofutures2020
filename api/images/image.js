require('dotenv').config()
const imageFolder = "conf";

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      let options = validateQuery(req.query)
      if (options) {
        let url = urlFormatter(options)
        sendResponse(req, res, 200, url);
      } else {
        sendResponse(req, res, 400, "Incorrectly formatted");
      }
      // Get options from the get request 
      // if(true) {
      // } else {
      //   sendResponse(req, res, 400, "Unable to connect");
      // }
    } catch (error) {
      sendResponse(req, res, 400, "Error");
    }
  }
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}

function validateQuery(query) {
  // Each different camera angle has things visible/invisible, so we can request different things
  let options = {}

  // Must always specify camera & day/night 
  if(query.cam && query.o7) {
    // TODO Need to check max values!
    switch (query.cam){
      case "1":
        if(query.o1 > 0 && query.o2 > 0 && query.o6 > 0) {
          // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
          options = (({cam, o1, o2, o6, o7, }) => ({cam, o1, o2, o6, o7}))(query)
          options.o3 = "0"; 
          options.o4 = "0";
          options.o5 = "0";
        } else {
          options = false;
        }
        return options;
      case "2":
      case "3":
        if(query.o1 > 0 && query.o2 > 0 && query.o3 > 0 && query.o6 > 0) {
          // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
          options = (({cam, o1, o2, o3, o4, o6, o7}) => ({cam, o1, o2, o3, o4, o6, o7}))(query)
          options.o5 = "0";
        } else {
          options = false;
        }
        return options;
      case "4":
        if(query.o1 > 0 && query.o2 > 0 && query.o4 > 0 && query.o6 > 0) {
          // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
          options = (({cam, o1, o2, o4, o6, o7}) => ({cam, o1, o2, o4, o6, o7}))(query)
          options.o3 = "0";
          options.o5 = "0";
        } else {
          options = false;
        }
        return options;
      case "13":
        // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
        options = (({cam, o7}) => ({cam, o7}))(query)
        options.o1 = "0";
        options.o2 = "0";
        options.o3 = "0";
        options.o4 = "0";
        options.o5 = "0";
        options.o6 = "0";
        return options;
      case "14": 
        if(query.o1 > 0 && query.o2 > 0 && query.o3 > 0 && query.o5 && query.o6 > 0) {
          if(outsideRange(5, query.o5)) console.log("option 5 invalid");
          // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
          options = (({cam, o1, o2, o3, o5, o6, o7}) => ({cam, o1, o2, o3, o5, o6, o7}))(query)
          options.o4 = "0";
        } else {
          options = false;
        }
        return options;
      default: 
        return false;
    }
  } else {
    console.log("incorrect formatting")
    return false
  }
}

function urlFormatter(opt) {
  // All options start from 1 (0 = option not visible)
  // In some cameras some options are not visible, so they are at 0
  let url = `${process.env.API_CDN_URL}/${imageFolder}/Camera${opt.cam}_${opt.o1}_${opt.o2}_${opt.o3}_${opt.o4}_${opt.o5}_${opt.o6}_${opt.o7}.jpg`
  return url
}

function outsideRange(optNum, value) {
  if(value === 0) {return true;}
  switch(optNum){
    case 1:
      return (value > 3) ? true : false;
    case 2:
      return (value > 3) ? true : false;
    case 3:
      return (value > 3) ? true : false;
    case 4:
      return (value > 3) ? true : false;
    case 5:
      return (value > 3) ? true : false;
    case 6:
      return (value !== "ON" || value !== "OFF") ? true : false;
    case 7:
      return (value > 2) ? true : false;
    default:
      return false;
  }
}