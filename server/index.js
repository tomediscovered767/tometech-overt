const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const cookies = require("cookie-parser");
const path = require('path');
require('dotenv').config();
var fs = require('fs');

app.use(bodyParser.json());
app.use(cookies());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const domainsFromEnv = process.env.CORS_DOMAINS || "";
const whitelist = domainsFromEnv.split(",").map(item => item.trim());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

require("./routes/AuthApiRoutes.js")(app);
require("./routes/GameListRoutes.js")(app);

if(process.env.NODE_ENV?.trim() === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

  app.get('*', (req, res) => {
    const root = path.join(__dirname, '../', 'client', 'build')
    res.sendFile('index.html', { root });
  });
}
else{
  app.use(express.static(path.join(__dirname, '../', 'client', 'public')));

  app.get('*', (req, res) => {
    const root = path.join(__dirname, '../', 'client', 'public')
    res.sendFile('index.html', { root });
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
