const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// api routes
app.use("/messages", require("./api/messages"));

// static files
app.use("/vanilla", express.static("../frontend"));

const port = process.env.PORT || 1337;
app.listen(port, () =>
  console.log(`Server listenning on http://localhost:${port}`)
);
