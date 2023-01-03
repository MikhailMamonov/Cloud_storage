const Router = require('express');
const router = new Router();
const auth = require('./auth');
const file = require('./file');

router.use('/auth', auth);
router.use('/files', file);

module.exports = router;
