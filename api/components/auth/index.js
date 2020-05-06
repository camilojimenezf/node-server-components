const store = require('../../../store/mysql');
const controller = require('./controller');

// le inyectamos el store al controller
module.exports = controller(store);