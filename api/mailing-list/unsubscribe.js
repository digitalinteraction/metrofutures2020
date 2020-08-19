require('dotenv').config()
import isEmail from 'validator/lib/isEmail';

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
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    res.status(403);
  } else {
    console.log('valid cookie');
    try {
      // Can search using using UUID
      
      // await sequelize.authenticate();
      // console.log('connected successfully');
      // await sequelize.sync({ alter: true });
      if(req.body.email && isEmail(req.body.email)) {
        await Email.create({email: req.body.email});
        res.json({
          body: "Successfully saved"
        });
      } else {
        // not email
        res.status(400);
        res.json({
          body: 'fail, incorrect formatting'
        });
      }
    } catch (error) {
      console.log('unable to connect', error)
      res.status(400);
      res.json({
        body: 'fail'
      });
    }
  }
}