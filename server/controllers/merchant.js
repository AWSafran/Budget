const merchantService = require('../services/merchant');

async function getMerchants(req, res, next) {
    const rows = await merchantService.getMerchants();
    res.json(rows);
}

async function postMerchant(req, res, next) {
    const response = await merchantService.addMerchant(req.body.name, req.body.categoryId);
    res.json(response);
}

async function putMerchant(req, res, next) {
    const response = await merchantService.editMerchant(req.params.id, req.body.name, req.body.categoryId);
    res.json(response);
}

module.exports = {
    getMerchants,
    postMerchant,
    putMerchant
}