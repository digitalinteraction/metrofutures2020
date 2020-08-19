require('dotenv').config()
import { v4 as uuidv4 } from 'uuid';
import isEmail from 'validator/lib/isEmail';
const sgMail = require('@sendgrid/mail');

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
    type: Sequelize.UUID,
    defaultType: Sequelize.UUIDV4,
    allowNull: false
  }
}, {
  tableName: 'mailing-list'
});

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
    // res.status(403);
    // res.json({
    //   body: "Unauthorized"
    // });
  } else {
    console.log('Valid cookie');
    try {
      // Can be used to test connection
      // await sequelize.authenticate();
      if(req.body.email && isEmail(req.body.email)) {
        let subEmail = req.body.email;
        await sequelize.sync({ alter: true });
        let result = await Email.findAll({
          where: {
            email: subEmail
          }
        });
        if(result && result.length > 0) {
          // This is a crude duplicate test
          sendResponse(req, res, 400, "Duplicated email address");
        } else {
          let subid = uuidv4();
          // For testing
          await Email.create({email: subEmail, subid: subid});
          let emailSuccess = await confirmationEmail(subEmail, subid);
          if(emailSuccess) {
            sendResponse(req, res, 200, "Subscribed successfully");
          } else {
            console.log("TO DO: Sucessfully stored in DB, but failed to send email");
            sendResponse(req, res, 200, "Subscribed successfully, no confirmation sent");
          }
        }
        
      } else {
        // Sanitisation failed
        res.status(400);
        res.json({
          body: 'Fail, incorrect formatting'
        });
      }
    } catch (error) {
      console.log('Unable to connect', error)
      res.status(400);
      res.json({
        body: 'Failed to connect'
      });
    }
  }
}



async function confirmationEmail (recipEmail, subid) {
  //  Testing email
  // recipEmail = "tfeltwell@gmail.com";
  let url = urlFormatter(subid)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: recipEmail,
    from: process.env.mailing_list_sender,
    subject: 'Confirmation of signup to MetroFutures Mailing List',
    text: `Message to subscriber, including link: ${url}`,
    html: `Message to subscriber, including link: <a href="${url}">${url}</a>`,
  };
  try {
    await sgMail.send(msg);
    console.log(`Sent confirmation email to ${recipEmail} with subid: ${subid}`);
    return true;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
    return false
  }
}

function urlFormatter (subid) {
  // Generate an unsubscribe link using the uuid of the submission
  return `${process.env.UNSUBSCRIBE_API}?authid=${subid}`
}

function sendResponse (req, res, status, message) {
  res.status(status);
  res.json({
    body: message
  });
}