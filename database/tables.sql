CREATE TABLE IF NOT EXISTS users (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL
);

INSERT INTO users (username, name) VALUES ('camilojimenezf', 'camilo');

CREATE TABLE IF NOT EXISTS auth (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_follow (
    user_from INTEGER UNSIGNED NOT NULL,
    user_to INTEGER UNSIGNED NOT NULL
);

-- crear llave foranea compuesta
ALTER TABLE user_follow ADD INDEX user_from_user_to (user_from, user_to);


CREATE TABLE IF NOT EXISTS posts (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    user_id INTEGER unsigned NOT NULL
);

INSERT INTO posts (text, user_id) VALUES ('Mi primer post', 1);
