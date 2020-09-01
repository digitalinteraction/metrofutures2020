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
      // UUID are unique
      let result = await Email.findOne({
        where: {
          subid: req.query.authid
        }
      });
      if (result) {
        console.log(`Email found matching ${result.subid}: ${result.email}`);
        await result.destroy();
        sendResponse(req, res, 200, "Thank you, this email address has been successfully unsubscribed.");
      } else {
        // UUID is not unique (shouldn't happen), or no result returned
        sendResponse(req, res, 400, "This email address is already unsubscribed.");
      }
    } else {
      // Failed on formatting, no authid
      console.log("No query sent or no authid");
      sendResponse(req, res, 400, "Unfortunately we were unable to unsubscribe this address. Please follow the link in your confirmation email.");
    }
  } catch (error) {
    sendResponse(req, res, 400, "Unfortunately we were unable to unsubscribe this address. Please follow the link in your confirmation email.");
  }
}

function sendResponse (req, res, status, message) {
  // res.status(status);
  res.writeHead(status, { 'Content-Type': 'text/html' });
  res.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Unsubscribe from the Metro Futures Mailing List</title></head><body><h1>Metro Futures Mailing List</h1><p>${message}</p><p>If you are having trouble, please <a href="mailto:support@metrofutures.org.uk">contact us</a>.</p><p>Visit the main site: <a href="https://metrofutures.org.uk">metrofutures.org.uk</a></p></body></html>`);
  res.end();
}