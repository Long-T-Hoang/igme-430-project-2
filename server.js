const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const API_KEY = "93f14f1d-e2fd-4f15-8dfc-c3c722e15746";
// import path library
const path = require('path');
const router = require('./router');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

router(app);

app.listen(port, () => {
  console.log(`gunpla-collection-app listening on port ${port}`);
});