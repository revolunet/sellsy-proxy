var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var Sellsy = require("node-sellsy")
var fetch = require('node-fetch');

var bodyParser = require('body-parser');

app = express()
app.use(cors())

//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


;["CONSUMER_KEY", "CONSUMER_SECRET"].forEach(key => {
  if (!process.env[key]) {
    console.error(`⚠️  missing ${key} environment variable. please refer to the README.\n`)
    process.exit(1)
  }
})

app.get("/", (req, res) => {
  console.log("req.headers", req.headers)
  if (!req.headers['x-user-token'] || !req.headers['x-user-secret']) {
    res.json({
      error: true,
      msg: 'missing headers'
    })
    return;
  }
  var sellsy = new Sellsy({
    creds: {
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      userToken: req.headers['x-user-token'],
      userSecret: req.headers['x-user-secret']
    }
  })
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


// proxify sellsy calls as-is
// compat with node-bookeo client-side
const sellsyProxy = (req, res) => {

  var url = 'https://apifeed.sellsy.com/0/'

  let params = "";
  params += `&request=${req.body.request}`;
  params += `&io_mode=${req.body.io_mode}`;
  params += `&do_in=${encodeURIComponent(req.body.do_in)}`;

  return fetch(url /*"http://127.0.0.1:8282"*/, {
    method: req.method,
    headers: {
      'authorization': req.headers.authorization,
      'content-type': req.headers['content-type']
    },
    body: params
  }).then(r => r.json())
  .then(json => {
    res.json(json)
    return json
  }).catch(r => {
    console.error(r)
    res.json({
      error: r
    })
  })

}

app.post("/", sellsyProxy)

const PORT = process.env.PORT || 8282

app.listen(PORT, () => {
  console.log(`sellsy-proxy listening on http://127.0.0.1:${PORT}`)
})
