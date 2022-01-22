const express = require('express');
const merchantController = require('../controllers/merchant');
const router = express.Router();

router.get('/', merchantController.getMerchants);
router.post('/', merchantController.postMerchant);
router.put('/:id', merchantController.putMerchant);

module.exports = router;