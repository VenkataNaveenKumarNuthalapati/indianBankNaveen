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
        user: `${SQL_USER}`,
        password: `${SQL_PASSWORD}`,
        database: `${SQL_DATABASE}`,
        server: `${SQL_SERVER}`,
        options: {
            encrypt: sqlEncrypt,
            enableAritAbort: true,
            trustServerCertificate: true
        }
    }
}