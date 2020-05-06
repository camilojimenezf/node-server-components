const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Connect
let connection;

function handleConnect() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.log('[db error]', err);
            setTimeout(handleConnect, 2000);
        } else  {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.log('[db error]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnect;
        } else {
            throw err;
        }
    });
}

handleConnect();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, response) => {
            if (error) return reject(error);
            console.log(response)
            resolve(response);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, response) => {
            if (error) return reject(error);
            resolve(response);
        })
    })
}

function upsert(table, data) {
    if(data && data.id) {
        return update(table,data);
    } else  {
        return insert(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`; // JOIN users ON user_follow.user_to = users.id
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    query
};