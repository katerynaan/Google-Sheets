const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

const uri =
  'mongodb+srv://katherineviegh:5YWsKNijqQB4Rju@cluster0.urhgipi.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();
const db = client.db('cells_data').collection('cells_data');

app.post('/getCells', async (req, res) => {
  const { id } = req.body;
  const foundOne = await db.findOne({ _id: id });
  if (foundOne) res.send(foundOne);
  else {
    await db.insertOne({ _id: id, numbers: {}, formulas: {} });
    res.send({ _id: id, numbers: {}, formulas: {} });
  }
});
app.post('/setCells', async (req, res) => {
  const cellsData = req.body;
  try {
    await db.updateOne(
      { _id: cellsData._id },
      { $set: { numbers: cellsData.numbers, formulas: cellsData.formulas } }
    );
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false, error: JSON.stringify(err) });
  }
});

app.listen(PORT);
