const {Router} = require('express')
const router = new Router()
const {vote, getVotePercentages} = require('../controllers/vote.controller')

router.post('/vote', vote)
router.get('/count-vote', getVotePercentages)

module.exports = router