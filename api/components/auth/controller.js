const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });
        console.log(data)
        return bcrypt.compare(password, data.password)
            .then(isValid => {
                if (isValid) {
                    // Generar token
                    return auth.sign({...data});
                } else {
                    // Enviar un error
                    throw new Error('Información invalida');
                }
            });

    }

    async function upsert(data) {
        let authData = {};
        if (data.id) {
            authData = {
                id: data.id
            }
        }

        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 8);
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    };
}