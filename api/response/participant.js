require('dotenv').config()
const pg = require('pg');  // Needed by Vercel
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.pg_db, process.env.pg_user, process.env.pg_pass, {
  host: process.env.pg_host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      requre: true,
      rejectUnauthorized: false
    }
  },
  port: 25060,
});

// Remember to initialise response-ppt-prod before live

// Sequelize db model here
const Response = sequelize.define('Response', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  questionid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  response: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sessid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: process.env.API_PPT_TABLE_NAME
}
);

// - 0: Local Authority
// - 1: age
// - 2: gender
// - 3: ethnicity
// - 4: disability
// - 5: journey purpose
// - 6: frequency

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    console.log('valid cookie', req.cookies.mfsid);
    let sessid = req.cookies.mfsid
    try {
      // await sequelize.authenticate();
      await sequelize.sync({ alter: true });  // This makes sure the DB matches the model, and will change it
      if (req.body) {
        console.log("participant data received:", req.body)
        // Implement these two so we can trigger an error response
        let submitted = 0;
        let success = 0;
        if (req.body.params["0"]) {
          submitted++;
          await addResponse(0, req.body.params[0], sessid) 
          success++;
        }
        if (req.body.params["1"] || req.body.params[1]) {
          submitted++;
          await addResponse(1, req.body.params[1], sessid) 
          success++;
        }
        if (req.body.params["2"] || req.body.params[2]) {
          submitted++;
          await addResponse(2, req.body.params[2], sessid) 
          success++;
        }
        if (req.body.params["3"] || req.body.params[3]) {
          submitted++; 
          await addResponse(3, req.body.params[3], sessid) 
          success++;
        }
        if (req.body.params["4"] || req.body.params[4]) { 
          submitted++;
          await addResponse(4, req.body.params[4], sessid) 
          success++;
        }
        if (req.body.params["5"] || req.body.params[5]) {
          submitted++;
          await addResponse(5, req.body.params[5], sessid) 
          success++;
        }
        if (req.body.params["6"] || req.body.params[6]) {
          submitted++; 
          await addResponse(6, req.body.params[6], sessid) 
          success++;
        }
        if (submitted === success) {
          sendResponse(req, res, 200, `Submitted data successfully`)
        } else {
          sendResponse(req, res, 200, `Submitted: ${submitted}, failed to submit: ${submitted - success}`)
        }
      } else {
        sendResponse(req, res, 400, "Incorrect formatting")
      }
    } catch (error) {
      console.log('unable to connect', error)
      sendResponse(req, res, 400, "Unable to connect")
    }
  }
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}

async function addResponse(qid, data, sessid) {
  console.log(`submitting ${qid}, data: ${data}, sessid: ${sessid}`)
  await Response.create({questionid: qid, response: data, sessid: sessid}).then(function() {
    console.log(`Added ${qid}: ${data} to DB`)
  }) 
  // Add an error catch here
}