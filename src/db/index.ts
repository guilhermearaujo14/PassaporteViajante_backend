import mysql from 'mysql2/promise';
import 'dotenv/config'
const port = process.env.PORT_DB || 3306


// const conn = mysql.createPool({
    // host: process.env.URL || 'localhost',
    // user: process.env.USER || 'root',
    // password: process.env.PASSWORD || '',
    // database: process.env.DATA_BASE || 'meudb',
    // port: Number(port),
    // connectionLimit: 10,
    // });
    
    
    
    
const pool = mysql.createPool({
    host: process.env.URL,
    user: process.env.USER,
    database: process.env.DB,
    password:  process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
    idleTimeout: 60000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

export default pool;

