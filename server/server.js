require('dotenv').config();
const express = require('express');
const cors = require('cors');

const categories = require('./controllers/category');
const merchants = require('./controllers/merchant');
const expenses = require('./controllers/expense');
const monthlyTargets = require('./controllers/monthlyTarget');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/categories', categories);
app.use('/merchants', merchants);
app.use('/expenses', expenses);
app.use('/monthlyTargets', monthlyTargets);

const listener = app.listen(process.env.port || 8080, () => {
    console.log(`Server is listening on port ${listener.address().port}`)
});