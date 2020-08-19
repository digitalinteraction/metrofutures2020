require('dotenv').config()

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

const Email = sequelize.define('Email', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subid: {
    type: DataTypes.UUIDV4,
    allowNull: false
  }
}, {
  tableName: 'mailing-list'
});

module.exports = async(req, res) => {
  try {
    if (req.query && req.query.authid) {
      let result = await Email.findAll({
        where: {
          subid: req.query.authid
        }
      });
      if (result && result.length > 0) {
        // TO DO - implement logic to handle the query and remove said record
        console.log(`remove ${req.query.authid} from db`);
        sendResponse(req, res, 200, "OK");
      }
    } else {
      // Failed on formatting, no authid
      sendResponse(req, res, 400, "Failed");
    }
  } catch (error) {
    sendResponse(req, res, 400, "Failed");
  }
}

function sendResponse (req, res, status, message) {
  res.status(status);
  res.json({
    body: message
  });
}