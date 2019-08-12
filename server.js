    
var path = require('path');
var express = require('express');
const cors = require('cors');
var app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}
app.options('*', cors(corsOptions));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8080);
app.get('/*', cors(corsOptions), function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use((req, res, next) => { if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) req.url = '/'; next() });

app.listen(8080, () => {
  console.log('CORS-enabled web server listening on port 8080');
});