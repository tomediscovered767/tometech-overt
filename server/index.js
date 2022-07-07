const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

require("./routes/AuthApiRoutes.js")(app);

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      console.log(path.join(__dirname, "../", "/client", "/build"));
      res.sendFile(path.resolve(__dirname, "../", "/client", "/build", '/index.html'));
    });
}
else{
  require('dotenv').config();
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
