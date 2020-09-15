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


// Remember to initialise response-explore-prod before live

const Response = sequelize.define('Response', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  hotspotid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scenename: {
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
  sessid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: process.env.API_EXPLORE_TABLE_NAME
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
        console.log("Survey - Body:", req.body)
        if (typeof(req.body.params["type"]) !== undefined && typeof(req.body.params["qid"]) !== undefined && typeof(req.body.params["resp"]) !== undefined) {
          console.log("All elements suppled ok")
          let optComment = ""
          if(req.body.params["comment"]) {
            console.log("Optional comment also received")
            optComment = req.body.params["comment"]
          } 
          // Sanity check
          console.log("Submitting to DB:", process.env.API_CONF_TABLE_NAME)
          // Commit to DB here
          await Response.create({questionid: req.body.params["qid"], response: req.body.params["resp"], comment: optComment, sessid: sessid})
          // Response - need to write the error route
          sendResponse(req, res, 200, "Submitted data successfully")
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