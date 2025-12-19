import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nodecomplete',
    database: 'node-complete',
})

export default pool.promise();