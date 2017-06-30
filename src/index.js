var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Sellsy = require('node-sellsy');

app = express();
app.use(cors());

if (!process.env.SELLSY_CREDS) {
  console.error('⚠️  missing SELLSY_CREDS environment variable. please refer to the README.\n')
  process.exit(1)
}

const SELLSY_CREDS = JSON.parse(process.env.SELLSY_CREDS)

app.get('/', (req, res) => {
  var sellsy = new Sellsy({
    creds: SELLSY_CREDS
  })
  sellsy.api({
    method: req.query.method,
    params: JSON.parse(req.query.params)
  }).then(data => {
    res.json(data);
  }).catch(e => {
    res.json({
      error: true,
      e
    });
  });
})

const PORT = process.env.PORT || 8282;

app.listen(PORT, () => {
  console.log(`sellsy-proxy listening on http://127.0.0.1:${PORT}`)
})

