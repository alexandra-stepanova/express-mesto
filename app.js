const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '610a02c3e425452775ab2bc3', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый адрес не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});