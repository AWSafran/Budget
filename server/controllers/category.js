const getCategories = (req, res, next) => {
    res.json({ message: 'categories' });
}

const postCategory = (req, res, next) => {
    res.json(req.body);
}

const putCategory = (req, res, next) => {
    res.json(req.body);
}

module.exports = {
    getCategories,
    postCategory,
    putCategory
};