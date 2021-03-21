const router = require('express').Router();
const controller = require('../controllers/post.controller');

router.post('/add', controller.add);
router.all('/', controller.fetch);

module.exports = router;