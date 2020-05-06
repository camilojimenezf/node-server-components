module.exports = {
    api: {
        port : process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret_semilla_del_backend!%/',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'toor',
        database: process.env.MYSQL_DB || 'node_backend',
    }
}