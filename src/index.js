var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var Sellsy = require("node-sellsy")

app = express()
app.use(cors())

;["CONSUMER_KEY", "CONSUMER_SECRET", "USER_TOKEN", "USER_SECRET"].forEach(key => {
  if (!process.env[key]) {
    console.error(`⚠️  missing ${key} environment variable. please refer to the README.\n`)
    process.exit(1)
  }
})

app.get("/", (req, res) => {
  var sellsy = new Sellsy({
    creds: {
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      userToken: process.env.USER_TOKEN,
      userSecret: process.env.USER_SECRET
    }
  })
  console.log("req.query.params", req.query.params)
  sellsy
    .api({
      method: req.query.method,
      params: req.query.params && JSON.parse(req.query.params)
    })
    .then(data => {
      res.json(data)
    })
    .catch(e => {
      res.json({
        error: true,
        e
      })
    })
})

const PORT = process.env.PORT || 8282

app.listen(PORT, () => {
  console.log(`sellsy-proxy listening on http://127.0.0.1:${PORT}`)
})
