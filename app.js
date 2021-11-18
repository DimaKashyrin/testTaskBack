const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  config: {
    MONGO_CONNECT_URL,
    PORT
  },
  constants: {
    DEFAULT_STATUS
  }} = require('./configs');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/user.router');
app.use('/users', userRouter);

app.use('*',(err, req, res, next) => {
  res
  .status(err.status || DEFAULT_STATUS)
  .json({
    message: err.message
  });
});

app.listen(PORT,() => {
  console.log('... STARTING SERVER >>> PORT: 5000')
})