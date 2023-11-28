const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;


beforeAll(async() => {


       const body = {
         
            email: "alexjfweb@gmail.com",
            password: "1234567"
       }
     const res = await  request(app).post('/users/login').send(body);
     token = res.body.token;
})


test(' GET / categories debe  mostrar todas las categoria', async () => {

    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);  // tbi
    
});

test('POST / categories   debe crear una categoria', async () => {

       const body = {
           
            name: "test Drive",

    }
    const res = await request(app).post('/categories').send(body)
    .set('Authorization', `Bearer ${token}`);

    console.log(res.body)

    
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
    
});

test('PUT  categories/:id debe actualizar la categoria ', async () => {

     const body = {

             name: "test Drive actualizar"
     }

    const res = await request(app).put(`/categories/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
 
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
    
});


test('Delete / categories/:id debe borrar una categoria', async () => {

    const res = await request(app).delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    
});