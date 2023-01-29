const { Pool } = require('pg');
const connectionString = '';
let instance = null;
const pool = new Pool({
  connectionString,
});

class DbService{
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async verifyLogin(email,password){
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`);
        client.end(); 
        return result.rows[0];
    }
    async getUsername(email,password) {
        const client = await pool.connect();
        const result = await client.query(`SELECT username FROM users WHERE email = '${email}' AND password = '${password}'`);
        client.end();
        return result.rows[0].username;
    }
    async registerUser(username,email,password) {
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO users (username, email, password) VALUES ('${username}','${email}','${password}')`);
        client.end(); 
        return result;
    }
    async getAllUsers(){
        const client = await pool.connect();
        const result = await client.query('SELECT username FROM users');
        client.end();
        return result.rows;
    }
    async getIdByUsername(username){
        const client = await pool.connect();
        const result = await client.query(`SELECT id FROM users WHERE username = '${username}'`);
        client.end();
        return result;
    }
}

module.exports = DbService;
