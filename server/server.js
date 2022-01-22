require('dotenv').config();
const express = require('express');
const routes = require('./routes/category');

const app = express();

app.use(express.json());
app.use('/', routes);

const listener = app.listen(process.env.port || 8080, () => {
    console.log(`Server is listening on port ${listener.address().port}`)
});