const express = require('express');
const monthlyTargetController = require('../controllers/monthlyTarget');
const router = express.Router();

router.get('/', monthlyTargetController.getMonthlyTargets);
router.post('/', monthlyTargetController.addOrUpdateMonthlyTargets);
router.delete('/', monthlyTargetController.deleteMonthlyTarget);

module.exports = router;