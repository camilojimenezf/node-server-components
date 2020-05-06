const TABLE = 'posts';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function list() {
        return await store.list(TABLE);
    }

    return {
        list,
    }
}