const { Router } = require('express')
const router = Router()
const Messages = require('../db/messages')

// get all messages
router.get('/', async (req, res) => {
  let { limit, offset } = req.query

  limit = parseInt(limit) || 10
  offset = parseInt(offset) || 0

  // limit the limit
  limit = Math.min(limit, 40)

  const messages = await Messages.findAll({ limit, offset })
  res.json({
    data: messages,
    pagination: {
      limit,
      offset,
    },
  })
})

module.exports = router
