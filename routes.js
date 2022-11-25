const express = require('express');
const router = express.Router();
const listController = require('./controllers/listController');

router.get('/', function (req, res) {
    listController.getRenderList(req, res);
});
router.get('/optiondata', function (req, res) {
    listController.getListOptionData(req, res);
});


module.exports = router;