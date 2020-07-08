const { Router } = require('express')
const router = Router()
const Messages = require('../db/messages')

// get all messages
router.get('/', async (req, res) => {
  const messages = await Messages.findAll({})
  res.json({
    data: messages,
  })
})

module.exports = router
