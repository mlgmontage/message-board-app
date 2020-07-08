const { Router } = require("express");
const router = Router();
const Messages = require("../db/messages");
const yup = require("yup");

// get all messages
router.get("/", async (req, res) => {
  let { limit, offset } = req.query;

  limit = parseInt(limit) || 10;
  offset = parseInt(offset) || 0;

  // limit the limit
  limit = Math.min(limit, 40);

  const messages = await Messages.findAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });
  res.json({
    data: messages,
    pagination: {
      limit,
      offset,
    },
  });
});

// insert message
router.post("/", async (req, res) => {
  const { username, message } = req.body;

  const schema = yup.object().shape({
    username: yup.string().required(),
    message: yup.string().required(),
  });

  schema.isValid({ username, message }).then(function (valid) {
    if (valid) {
      Messages.create({ username, message }).then((inserted) => {
        res.json({
          message: "Message has been successfully inserted",
          data: inserted,
        });
      });
    } else {
      res.status(500).json({
        message: "Bad request",
      });
    }
  });
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  id = parseInt(id);
  const schema = yup.object().shape({
    id: yup.number().required().positive().integer(),
  });

  schema.isValid({ id }).then(async (valid) => {
    if (valid) {
      const deleted = await Messages.destroy({
        where: {
          id,
        },
      });

      res.json({
        message: "Successfully deleted",
        numberOfdeleted: deleted,
      });
    } else {
      res.status(500).json({
        message: "Bad request",
      });
    }
  });
});

module.exports = router;
