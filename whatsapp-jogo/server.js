require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/webhook'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
