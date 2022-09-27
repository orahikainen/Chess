const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "dbuser",
    password: "Passw0rd",
    database: "käyttäjät",
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async registerUser({name:name,email:email,password:password,number:number}){
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tiedot (nimi, email, salasana, puhelinnumero) VALUES (?,?,?,?);";
                connection.query(query, [name,email,password,number] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getEmailAndPassword(email, password){
        var result;
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT EXISTS ( SELECT * FROM tiedot WHERE email = \"${email}\" AND salasana = \"${password}\")`;
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                    result = Object.values(JSON.parse(JSON.stringify(results[0])))[0];
                })
            });
        } catch (error) {
            return "error";
        }
        if(result) return true;
        return false; 
    }

    async getUsername(email,password){
        var result;
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT nimi FROM tiedot WHERE email = \"${email}\" AND salasana = \"${password}\"`;
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                    result = results;
                })
            });
        } catch (error) {
            return "error";
        }
        return result;
    }
}

module.exports = DbService;