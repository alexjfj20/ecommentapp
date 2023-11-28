const request = require('supertest');
const app = require('../app');
require('../models');




let id;
let token;

beforeAll(async() => {


    const body = {
      
        email: "alexjfweb@gmail.com",
        password: "1234567",
    }
  const res = await  request(app).post('/users/login').send(body);
  token = res.body.token;
})




test('GET / cart debe mostrar todo  lo del productos', async () => {
      
    const res = await request(app).get('/cart')
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    
});


test('POST  / cart  debe crear una comprar ' , async () => {

    const  body = {

        quantity: "test 5"
    }   

    const res = await request(app).post('/cart').send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
   expect(res.body.id).toBeDefined();
   expect(res.body.quantity).toBe(body.quantity);
    
});

test('PUT / cart debe actualizar un producto al carrito', async () => {

       const body = {

        quantity: "test 6 actualizado" 

       }

    const res = await request(app).put(`/cart/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
    
});


test('DELETE / cart  debe borrar un producto en el carrito', async () => {

    const res = await request(app).delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    
});