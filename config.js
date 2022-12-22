require('dotenv').config()

const port_port_server = process.env.port_port_server
const port_db = process.env.PORT_DB
const user_db = process.env.USER.DB
const password_db = process.env.PASSWORD.DB
const name_db = process.env.NAME_DB
const host_db = process.env.HOST_DB

module.exports = {
    port_server,
    port_db,
    user_db,
    password_db,
    name_db,
    host_db
}
