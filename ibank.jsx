// const sql = require('mssql');

// const config = {
//     server: 'DESKTOP-N1JPSN9', // '192.168.157.29',
//     database: 'IndianBankDB',
//     options: {
//         trustedConnection: true // Use Windows Authentication
//     }
// };

// async function connectToSqlServer() {
//     try {
//         await sql.connect(config);
//         console.log('Connected to SQL Server using Windows Authentication');

//         // Perform database queries or other operations here...

//         // Close the connection when done
//         await sql.close();
//         console.log('Connection closed');
//     } catch (err) {
//         console.error('Error connecting to SQL Server:', err);
//     }
// }

// connectToSqlServer();

const express = require('express');
const cors = require('cors');
const app = express();

const config = require('./config.jsx');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

//////////////////////// SqlServer DB connection /////////////////////////
const mssql = require('mssql');
const getConnection = async () => {
    try {
        await mssql.connect(
            {
                user: `MySQLServerLogin`,
                password: `4089`,
                database: `IndianBankDB`,
                server: `192.168.157.29`,
                options: {
                    // encrypt: sqlEncrypt,
                    // enableAritAbort: true,
                    trustServerCertificate: true
                }
            }
        );
        console.log('Connected to SQL Server successfully!');
        return new mssql.Request();
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw new Error('Error connecting to the database');
    }
};

const closeConnection = () => {
    mssql.close();
};
///////////////////////////////////////////////////////////////////////////

////////////////// API 1 /////////////////////////
app.get('/', async (req, res) => {
    try {
        const request = await getConnection();
        const records = await request.query(`SELECT * FROM AccountMaster;`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send(`Error executing SQL query ${queryError}`);
    } finally {
        closeConnection();
    }
});

////////////////// API 1 /////////////////////////
app.get('/login/:accNum', async (req, res) => {
    const accNum = req.params.accNum; // Access the parameter using req.params

    try {
        const request = await getConnection();
        const records = await request.query(`SELECT * FROM AccountMaster WHERE ACID = ${accNum};`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send('Error executing SQL query');
    } finally {
        closeConnection();
    }
});

////////////////// API 2 /////////////////////////
app.get('/statement/:accNum', async (req, res) => {
    const accNum = req.params.accNum; // Access the parameter using req.params
    try {
        const request = await getConnection();
        const records = await request.query(`select * , 0 as TotalBal from TransactionMaster WHERE ACID = ${accNum};`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send('Error executing SQL query');
    } finally {
        closeConnection();
    }
});

const server = app.listen(5000, () => {
    console.log('Server is listening at port' + 5000);
});
