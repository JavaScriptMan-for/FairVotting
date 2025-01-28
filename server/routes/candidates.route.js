const {Router} = require('express')
const router = new Router();

const {getCandidates} = require('../controllers/candidatesFunct')

router.get('/candidates', getCandidates)

module.exports = router;
