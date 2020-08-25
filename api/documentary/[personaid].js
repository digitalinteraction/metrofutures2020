// Dynamic routing: This clever format will take the variable in [] in the filename (e.g. personaid) and make it available on req.query

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

const Documentary = sequelize.define('Documentary', {
    personaid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stageid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    src: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    opt: {
      type: DataTypes.JSON,
    },
    nextid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
);

module.exports = async(req, res) => {
  console.log(req.query)
  // Check cookie
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    if (req.query.personaid) {
      // Check stageid present, if not, default to 0
      let stageid;
      if(!req.query.stageid) {
        stageid = 0
      } else {
        stageid = req.query.stageid
      }
      if (!isNaN(req.query.personaid) && !isNaN(stageid)) {
        try {
          await sequelize.sync({ alter: true });
          let personaid = req.query.personaid;
          // Retrieve the personaid and stageid from database
          // Return valid data
          let result = await Documentary.findAll({
            where: {
              personaid: personaid,
              stageid: stageid
            }
          })
          if(result && result.length > 0) {
            console.log(result[0].opt);
            sendResponse(req, res, 200, `This response will send details about the personaid ${req.query.personaid} for stageid ${stageid} `)
          } else {
            console.log("Nothing found for this query");
            sendResponse(req, res, 200, 'Nothing found');
          }

        } catch (error) {
          console.log("Unable to connect", error);
          sendResponse(req, res, 400, "Unable to connect");
        }
      } else {
        console.log("personaid or stageid not number")
        sendResponse(req, res, 400, "Incorrectly formatted request");
      }
    } else {
      sendResponse(req, res, 400, "Incorrectly formatted request");
    }
  }
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}

// async function dummyData(Documentary) {
//   await Documentary.create({
//     personaid: 999, 
//     stageid: 1, 
//     desc: "In the darkness of a tunnel...", 
//     src: "https://youtu.be/6lutNECOZFw",
//     type: "prompt",
//     opt: {question: "Question", answers: ["option 1", "option 2", "option 3"]},
//     nextid: 2
//   })
//   await Documentary.create({
//     personaid: 999, 
//     stageid: 2, 
//     desc: "In the darkness of a tunnel...", 
//     src: "https://youtu.be/6lutNECOZFw",
//     type: "desc",
//     opt: {},
//     nextid: 3
//   })
// }