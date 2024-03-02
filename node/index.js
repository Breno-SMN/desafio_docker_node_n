const express = require('express')
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql');

function initializeDatabase() {
  const connection = mysql.createConnection(config);

  const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
  const sql = `INSERT INTO people(name) values('Breno')`;

  connection.query(sqlTable, (error) => {
    if (error) throw error;
    console.log('Tabela criada com sucesso!');
    connection.query(sql, (error) => {
      if (error) throw error;
      console.log('Dados inseridos com sucesso!');
      connection.end();
    });
  });
}

app.get('/', (req, res) => {
  res.send('<h1> Full Cycle Rocks!!</h1>')
})

app.get('/names', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) {
      console.error('Erro ao consultar nomes:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.send(results);
    }
  });
})

app.listen(port, async () => {
  initializeDatabase();
  console.log('Rodando na porta ' + port)
})