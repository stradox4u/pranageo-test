const express = require("express");
const router = require("./routes/git");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', router);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(8000);