require('dotenv').config()
const pg = require('pg');  // Needed by Vercel
const { Sequelize } = require('sequelize');
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

module.exports = async(req, res) => {
  if(!req.cookies.mfsid){
    console.log('Unauthorized');
    res.status(403);
  } else {
    console.log('valid cookie');
    try {
      await sequelize.authenticate();
      console.log('connected successfully');
      res.json({
        body: "response"
      });
    } catch (error) {
      console.log('unable to connect', error)
      res.status(400);
      res.json({
        body: 'fail'
      });
    }
  }
}