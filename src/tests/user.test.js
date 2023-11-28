const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST / user debe crear un nuevo usuario', async () => {

    const body = {

        firstName: "test Pedro",
        lastName: "test Murcia",
        email: "test alexjfweb@gmail.com",
        password: "test 1234567",
        phone: "test 222333",
    }

    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();

});



test('POST / user/login retorna que esta bien 200', async () => {

    const body = {

        email: "alexjfweb@gmail.com",
        password: "1234567",

    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);

});



test('GET / user debe mostrar todo los usuario', async () => {
    console.log(token);
    const res = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);


});




test('PUT / users/:id   debe actualizar un usuario', async () => {

    const body = {

        firstName: "alex actualizado"

    }

    const res = await request(app).put(`/users/${id}`).send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);

});


test('POST / user/login  estes envia el mensaje si la credenciales esta mal', async () => {

    const body = {

        email: "alexjfwebooo@gmail.com",
        password: "1234567000",

    }
    const res = await request(app).post('/users/login').send(body);

    expect(res.status).toBe(401);

});


test('DELETE /users/:id debe borrar un usuario', async () => {

    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(204);



});