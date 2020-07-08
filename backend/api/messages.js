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

// insert message
router.post('/', async (req, res) => {
  const { username, message } = req.body
  const inserted = await Messages.create({ username, message })
  res.json({
    message: 'Message has been successfully inserted',
    data: inserted,
  })
})

router.delete('/', async (req, res) => {
  const { id } = req.body
  const deleted = await Messages.destroy({
    where: {
      id,
    },
  })

  res.json({
    message: 'Successfully deleted',
    numberOfdeleted: deleted,
  })
})

module.exports = router
