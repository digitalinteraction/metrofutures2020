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

const Persona = sequelize.define("Persona", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    sendResponse(req, res, 403, "Unauthorized");
  } else {
    try {
      await sequelize.sync({ alter: true });
  
      // TODO implement query so you can get this for only 1 persona

      let result = await Persona.findAll()
      if (result && result.length > 0) {
        let returnObjects = []
        for (let item of result){
          delete item.dataValues.createdAt;
          delete item.dataValues.updatedAt;
          returnObjects.push(item.dataValues);
        }
        // console.log(result);
        sendResponse(req, res, 200, returnObjects);
      } else {
        sendResponse(req, res, 400, "Unable to connect");
      }
    } catch (error) {
      sendResponse(req, res, 400, "Error");
    }
  }
}

function sendResponse(req, res, status, message) {
  res.status(status);
  res.send(message);
}