module.exports = (req, res) => {
  if(req.cookies.mfsid){
    res.status(200);
    res.json({
      body: "Get Images endpoint"
    });
  } else {
    res.status(400);
    res.json({
      body: "Unauthorised"
    });
  }
}