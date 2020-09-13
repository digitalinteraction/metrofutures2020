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


// Remember to initialise response-conf-prod before live

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
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sessid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: process.env.API_CONF_TABLE_NAME
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
        if (req.body["type"] && req.body["qid"] && req.body["resp"]) {
          console.log("All elements suppled ok")
          let optComment = ""
          if(req.body["comment"]) {
            console.log("Optional comment also received")
            optComment = req.body["comment"]
          } 
          // Sanity check
          console.log("Submitting to DB:", process.env.API_CONF_TABLE_NAME)
          // Commit to DB here
          await Response.create({questionid: req.body["qid"], response: req.body["resp"], comment: optComment, sessid: sessid})
          // Response - need to write the error route
          sendResponse(req, res, 200, "Received")
        }
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