module.exports = (req, res) => {
  const { data = 'test' } = req.query
  res.status(200).send(`Response was: ${data}!`)
}