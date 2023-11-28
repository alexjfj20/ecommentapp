const app = require('../app');
const sequelize = require('../utils/connection');
const request = require('supertest');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests

       const user = {

            firstName: "Pedro",
            lastName: "Murcia",
            email: "alexjfweb@gmail.com",
            password: "1234567",
            phone: "222333"
      }
    await request(app).post('/users').send(user);


        sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();