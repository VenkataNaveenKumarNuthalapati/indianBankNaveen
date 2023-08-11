'use strict';
const dotenv = require('dotenv');

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, SQL_ENCRYPT } = process.env;

const sqlEncrypt = SQL_ENCRYPT === true;
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        user: `MySQLServerLogin`,
        password: `4089`,
        database: `IndianBankDB`,
        server: `192.168.157.29`,
        options: {
            encrypt: sqlEncrypt,
            enableAritAbort: true,
            trustServerCertificate: true
        }
    }
}