const { nanoid } = require('nanoid');
const auth = require('../auth'); // por defecto trae al index
const TABLE = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id)
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username
        }
        if (body.id) {
            user.id = body.id;
        }
        
        if (body.password || body.username) {
            const response = await auth.upsert({
                id: user.id ? user.id : null,
                username: user.username,
                password: body.password
            });
            // nos aseguramos que el user tendra el mismo id en la tabla auth y el la tabla users
            user.id = response.insertId;
        }

        return store.upsert(TABLE, user);
    }

    async function follow(from, to) {
        const response = await store.upsert('user_follow' ,{
            user_from: from,
            user_to: to
        });

        return response;
    }

    async function following(user) {
        const join = {};
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };

        return await store.query('user_follow', query, join);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}