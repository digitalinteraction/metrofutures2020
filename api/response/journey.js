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
    console.log('valid cookie');
    let sessid = req.cookies.mfsid
    try {
      await sequelize.sync({ alter: true });  // This makes sure the DB matches the model, and will change it
      if (req.body) {
        let params = req.body.params
        console.log("Survey - Body:", params)
        // Check we have the essentials and they're not empty
        if (typeof(params["hotspotName"]) !== undefined && params["hotspotName"] && typeof(params["sceneId"] && params["sceneId"] >= 0) !== undefined) {
          if(params["comment"] && params["likert"]) {
            // We have both content
            await Response.create({hotspotName: params["hotspotName"], sceneId: params["sceneId"], comment: params["comment"], likert: params["likert"], sessid: sessid})
            sendResponse(req, res, 200, "Submitted successfully.")
          } else if (params["comment"]) {
            // We only have comment
            await Response.create({hotspotName: params["hotspotName"], sceneId: params["sceneId"], comment: params["comment"], likert: null, sessid: sessid})
            sendResponse(req, res, 200, "Submitted successfully.")
          } else if (params["likert"]) {
            // We only have likert
            await Response.create({hotspotName: params["hotspotName"], sceneId: params["sceneId"], comment: null, likert: params["likert"], sessid: sessid})
            sendResponse(req, res, 200, "Submitted successfully.")
          } else {
            // We don't have data
            sendResponse(req, res, 400, "Incorrect formatting.")
          }
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