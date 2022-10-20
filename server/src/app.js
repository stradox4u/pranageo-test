const express = require("express");
require("dotenv").config();
const cors = require("cors");
const gitRoutes = require("./routes/git");
const stageRoutes = require("./routes/stage");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_APP_URL,
  methods: 'GET,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,Accept',
  credentials: true,
}));

app.use('/api/v1', gitRoutes);
app.use('/api/v1', stageRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(8000);