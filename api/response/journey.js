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


// Remember to initialise response-journey-prod before live

const Response = sequelize.define('Response', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  personaName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  likert: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  option: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sessid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: process.env.API_JOURNEY_TABLE_NAME
}
);

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    // console.log('valid cookie');
    let sessid = req.cookies.mfsid
    try {
      await sequelize.sync({ alter: true });  // This makes sure the DB matches the model, and will change it
      if (req.body) {
        let params = req.body.params
        // console.log("Survey - Body:", params)
        // Check we have the essentials and they're not empty
        if (typeof(params["personaName"]) !== undefined && params["personaName"] && typeof(params["stageId"] && params["stageId"] >= 0) !== undefined) {
          let comment = null;
          let likert = null;
          let option = null;
          // Likert, comment and option can all be empty
          // Usual case: likert w/ optional comment
          // Option w/ optional comment
          if(params["comment"]) {
            comment = params["comment"]
          } 
          if (params["likert"]) {
            likert = params["likert"]
          }
          if (params["option"] === "0" || params["option"] === 0 || params["option"]) {
            option = params["option"]
          } 

          if (!comment && !likert && option === null) {
            // We haven't actually submitted any data, we shouldn't be here
            sendResponse(req, res, 400, "Incorrectly formatted")
          }
          await Response.create({personaName: params["personaName"], stageId: params["stageId"], comment: comment, likert: likert, option: option, sessid: sessid})
          // console.log("Submitted", params["personaName"], params["stageId"], comment, likert, option)
          sendResponse(req, res, 200, "Submitted successfully.")
        } else {
          sendResponse(req, res, 200, "No body params")
        }
      } else {
        sendResponse(req, res, 400, "Incorrectly formatted")
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