const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

require("./routes/AuthApiRoutes.js")(app);

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile('../client/build/index.html', { root: __dirname });
    });
}
else{
  require('dotenv').config();
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
