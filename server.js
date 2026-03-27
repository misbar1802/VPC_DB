const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: '10.0.3.202',
  user: 'root',
  password: 'password',
  database: 'appdb'
});

db.connect();

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  db.query(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email]);
  res.send("Data saved successfully");
});

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

app.listen(3000, () => console.log("Server running"));
