const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {


    const body = {
      
         email: "test alexjfweb@gmail.com",
         password: "test 1234567"
    }
  const res = await  request(app).post('/users/login').send(body);
  token = res.body.token;
})



test('Get / product debe mostrar todo los productos', async () => {

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    
});


test('POST / product debe crear  un producto', async () => {

    const  body = {
          
        title: " test disco duro",
        description: " test 3 gaby",
        categoryld: " test drive",
        brand: "test ibm",
        price: "test 200"

    }

    const res = await request(app).post('/products').send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(body.title);
    
});

test('PUT / producto debe actualizar el producto', async () => {

      const body = {
      
           title: " test disco duro actualizado"

      }

    const res = await request(app).put(`/products/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title);
    
});


test('Delete / product debe borrar un producto', async () => {

    const res = await request(app).delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
     expect(res.status).toBe(204);
    
});