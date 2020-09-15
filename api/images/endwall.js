require('dotenv').config()
const imageFolder = "endwall";
const seatIdMap = ["A", "B", "C", "D"];

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      // Design can be optional - if it's not specified return all possible URLs

      // TO DO TO DO TO DO 
      // SEND SINGLE URL FOR THIS DESIGN
      if(typeof(req.query.design) !== undefined) {
        let options = validateQuery(req.query)
        if (options && req.query.design > 0) {
          console.log("design is specified", req.query.design)
          // Specify design
          options.design = convertDesign(req.query.design)
          let url = urlFormatter(options)
          sendResponse(req, res, 200, url, options);
        } else {
          console.log("Design is not or is 0", req.query.design)
          // SENDING ALL URLS FOR THIS OPTION SET
          let options = validateQuery(req.query)
          let data = generateUrls(options)
          sendResponse(req, res, 200, data);
        }
        // Get options from the get request 
        // if(true) {
        // } else {
        //   sendResponse(req, res, 400, "Unable to connect");
        // }

      } else {
        sendResponse(req, res, 200, "Error");
      }
    } catch (error) {
      sendResponse(req, res, 400, "Error");
    }
  }
}

function sendResponse(req, res, status, message, options) {
  let responseObj = {}
  if (options) {
    responseObj = {
      url: message,
      options: options
    }
  } else {
    responseObj = message
  }
  res.status(status);
  res.send(responseObj);
}

function validateQuery(query) {
  // Only checks options relevant for image
  let options = {}
  // Must always specify camera & day/night 

  // WE ALSO WANT query.design - TO DO ADD LOGIC FOR THIS
  
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

// Configured to work only for end wall URLs
function urlFormatter(opt) {
  // All options start from 1 (0 = option not visible, thus irrelevant)
  // In some cameras some options are not visible, so they are at 0
  console.log(opt.design)
  let url = `${process.env.API_CDN_URL}/${imageFolder}/Camera${opt.cam}_${opt.o1}_${opt.o2}_${opt.o3}_${opt.o4}_${opt.o5}_${opt.o6}_${opt.o7}${opt.design}.jpg`
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

function convertDesign(designId) {
  if (designId > 0) {
    return seatIdMap[designId-1]
  } else {
    return seatIdMap[0]
  }
}

function generateUrls(options) {
  // Take the qindex (1 indexed) and all our o1, o2 etc options, and generate the day and night URLs for the given question (e.g. question 1 has 3 options in it, so generate 3 day + 3 night URLs)

  // We don't know which designs we want so generate all
  let optionsPayload = options
  let urlsDay = []
  let urlsNight = []
  let numOptions = 4;  // Number of options for endwall design

  console.log("Num options:", numOptions, "for designs")

  // Run for loop
  for (let i = 1; i <= numOptions; i++){
    // Modify options with the i+1 of for loop
    let optionsString = "design"
    optionsPayload[optionsString] = convertDesign(i)
    console.log(optionsPayload)
    
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
