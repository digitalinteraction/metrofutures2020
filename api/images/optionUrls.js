require('dotenv').config()
const imageFolder = "conf";

// Get all the image URLs for a given question index and set of options(day + night)

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      let options = validateQuery(req.query)
      let optionUrls = []
      if (options && req.query.qindex > 0 && req.query.qindex <= 6) {
        // console.log(req.query.qindex, options)
        optionUrls = generateUrls(req.query.qindex, options)
        sendResponse(req, res, 200, optionUrls)
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
  // Only checks options relevant for image
  let options = {}
  // Must always specify camera & day/night 
  if(outsideRange(0, query.cam) && outsideRange(7, query.o7)) {
    switch (query.cam){
      case "1":
        // Check the constraints for each of the camera views (the minimum specified options)
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) > 0 && outsideRange(6, query.o6) > 0) {
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
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) && outsideRange(3, query.o3) && outsideRange(6, query.o6)) {
          // Destructures query into our own array - quite neat syntax. Anything not required is set to "0"
          options = (({o1, o2, o3, o4, o6, o7}) => ({o1, o2, o3, o4, o6, o7}))(query)
          options.o5 = "0";
          options.cam = "2and3"
        } else {
          options = false;
        }
        return options;
      case "4":
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) && outsideRange(4, query.o4) && outsideRange(6, query.o6)) {
          options = (({cam, o1, o2, o4, o6, o7}) => ({cam, o1, o2, o4, o6, o7}))(query)
          options.o3 = "0";
          options.o5 = "0";
        } else {
          options = false;
        }
        return options;
      case "5":
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) && outsideRange(5, query.o5) && outsideRange(6, query.o6)) {
          options = (({cam, o1, o2, o6, o7}) => ({cam, o1, o2, o6, o7}))(query)
          options.o3 = "0"
          options.o4 = "0"
          options.o5 = convertPrioritySeats(query.o5)
        } else {
          options = false;
        }
        return options;
      case "6":
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) && outsideRange(6, query.o6)) {
          options = (({cam, o1, o2, o6, o7}) => ({cam, o1, o2, o6, o7}))(query)
          options.o3 = "0";
          options.o4 = "0";
          options.o5 = "0"
        } else {
          options = false;
        }
        return options;
      case "13":
        options = (({cam, o7}) => ({cam, o7}))(query)
        options.o1 = "0";
        options.o2 = "0";
        options.o3 = "0";
        options.o4 = "0";
        options.o5 = "0";
        options.o6 = "0";
        return options;
      case "14": 
        if(outsideRange(1, query.o1) && outsideRange(2, query.o2) && outsideRange(3, query.o3) && outsideRange(5, query.o5) && outsideRange(6, query.o6)) {
          options = (({cam, o1, o2, o3, o6, o7}) => ({cam, o1, o2, o3, o6, o7}))(query)
          options.o4 = "0";
          options.o5 = convertPrioritySeats(query.o5)
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
  // All options start from 1 (0 = option not visible, thus irrelevant)
  // In some cameras some options are not visible, so they are at 0
  let url = `${process.env.API_CDN_URL}/${imageFolder}/Camera${opt.cam}_${opt.o1}_${opt.o2}_${opt.o3}_${opt.o4}_${opt.o5}_${opt.o6}_${opt.o7}.jpg`
  return url
}

// Only check options we care about, as will return false if they are 0
function outsideRange(optNum, value) {
  if(value == 0 || !value) {return false;}
  switch(optNum){
    case 0 :
      if (value <= 6 || value == 13 || value == 14) { 
        return true 
      } else { 
        return false 
      }
    case 1:
      return (value <= 3) ? true : false;
    case 2:
      return (value <= 4) ? true : false;
    case 3:
      return (value <= 3) ? true : false;
    case 4:
      return (value <= 3) ? true : false;
    case 5:
      return (value <= 2) ? true : false;
    case 6:
      return ( value <= 3) ? true : false;
    case 7:
      return (value <= 2) ? true : false;
    default:
      return false;
  }
}

function convertPrioritySeats(seatValue) {
  if (seatValue == 0) { return "0"}
  if (seatValue == "1") {
    return "ON"
  } else {
    return "OFF"
  }
}

function generateUrls(qindex, options) {
  // Take the qindex (1 indexed) and all our o1, o2 etc options, and generate the day and night URLs for the given question (e.g. question 1 has 3 options in it, so generate 3 day + 3 night URLs)
  let questionIndex = parseInt(qindex)
  let optionsPayload = options
  let urlsDay = []
  let urlsNight = []
  let numOptions = 0;

  // Set number of options (dependent on the question index)
  switch(questionIndex) {
    case 1:
      numOptions = 3
      break;
    case 2:
      numOptions = 4
      break;
    case 3:
      numOptions = 3
      break;
    case 4:
      numOptions = 3
      break;
    case 5:
      numOptions = 2
      break;
    case 6:
      numOptions = 3
      break;
  }

  console.log("Num options:", numOptions, "for index", questionIndex)

  // Run for loop
  for (let i = 1; i <= numOptions; i++){
    // Modify options with the i+1 of for loop
    let optionsString = "o"+questionIndex
    if (qindex == 5) {
      optionsPayload[optionsString] = convertPrioritySeats(i)
    } else {
      optionsPayload[optionsString] = i
    }
    
    optionsPayload.o7 = 1  // Modify with day
    // Generate Url and store in array
    urlsDay.push(urlFormatter(optionsPayload))

    optionsPayload.o7 = 2  // Modify with night
    // Generate Url and store in array
    urlsNight.push(urlFormatter(optionsPayload))
  }
  // Concate both together into an easily accessible object at the other end
  return {day: urlsDay, night: urlsNight}
}