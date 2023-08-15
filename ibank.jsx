/////////////////////////////////////////////  DP CODE /////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const app = express();

const config = require('./config.jsx');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

//////////////////////// SqlServer DB connection /////////////////////////
const mssql = require('mssql');

let request;
const getConnection = async () => {
    console.log(config.sql);
    try {
        // await mssql.connect(config.sql);
        await mssql.connect(config.sql);
        console.log('Connected to SQL Server successfully!');
        request = new mssql.Request();
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw new Error('Error connecting to the database');
    }
};
getConnection();

const closeConnection = () => {
    mssql.close();
};
///////////////////////////////////////////////////////////////////////////

////////////////// API 1 /////////////////////////
app.get('/', async (req, res) => {
    try {
        // const request = await getConnection();
        const records = await request.query(`SELECT * FROM AccountMaster;`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send(`Error executing SQL query ${queryError}`);
    }
    // finally {
    //     closeConnection();
    // }
});

////////////////// API 2 /////////////////////////
app.get('/login/:accNum', async (req, res) => {
    const accNum = req.params.accNum; // Access the parameter using req.params

    try {
        // const request = await getConnection();
        const records = await request.query(`SELECT * FROM AccountMaster WHERE ACID = ${accNum};`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send('Error executing SQL query');
    }
    // finally {
    //     closeConnection();
    // }
});

////////////////// API 2 /////////////////////////
app.get('/statement/:accNum', async (req, res) => {
    const accNum = req.params.accNum; // Access the parameter using req.params
    try {
        // const request = await getConnection();
        const records = await request.query(`select * , 0 as TotalBal from TransactionMaster WHERE ACID = ${accNum};`);
        res.status(200).send(records.recordset);
    } catch (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.status(500).send('Error executing SQL query');
    }
    // finally {
    //     closeConnection();
    // }
});

const server = app.listen(config.port, () => {
    console.log('Server is listening at ' + config.url);
});