const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var fs = require('fs');

app.use(bodyParser.json());

require("./routes/AuthApiRoutes.js")(app);

if(process.env.NODE_ENV?.trim() === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

  app.get('*', (req, res) => {
    const root = path.join(__dirname, '../', 'client', 'build')
    res.sendFile('index.html', { root });
  });
}
else{
  require('dotenv').config();

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
