import { v4 as uuidv4 } from 'uuid';

module.exports = (req, res) => {
  if(req.cookies && req.cookies.mfsid){
    res.status(200);
    const responseObj = { body: "Cookie already stored." }
    res.send(responseObj)
  } 
  else {
    let cookie = uuidv4();
    res.setHeader('Set-Cookie', [`mfsid=${cookie}; SameSite=Strict`]);
    res.status(200);
    const responseObj = { body: "Session cookie stored." }
    res.send(responseObj)
  }
}