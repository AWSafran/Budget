require('dotenv').config();
const express = require('express');
const categories = require('./routes/category');
const merchants = require('./routes/merchant');
const expenses = require('./routes/expense');

const app = express();

app.use(express.json());
app.use('/categories', categories);
app.use('/merchants', merchants);
app.use('/expenses', expenses);

const listener = app.listen(process.env.port || 8080, () => {
    console.log(`Server is listening on port ${listener.address().port}`)
});