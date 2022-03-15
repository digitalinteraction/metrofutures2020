import { v4 as uuidv4 } from 'uuid';

module.exports = (req, res) => {
  if(req.cookies){
    if(req.cookies.mfsid){
      res.status(200);
      res.json({
        body: "Cookie already stored."
      });
    }
  } 
  else {
    let cookie = uuidv4();
    res.setHeader('Set-Cookie', [`mfsid=${cookie}; SameSite=Strict`]);
    res.status(200);
    res.json({
      body: "Session cookie stored."
    });
  }
}