// test/server.test.js
const request = require('supertest');
const app = require('../app');
const { default: mongoose } = require('mongoose');
const { connectToDB } = require('../helpers/database/database');
const { addTodo } = require('../model/todo');

let todo;
let token;
beforeAll(async () => {
    await connectToDB();
    todo = await addTodo({
        title: "Test todo",
        description: "This is a sample"
    });
    const getToken = await request(app).post('/api/auth/login').send({
        username: "johndoe",
        password: "12345"
    })
    token = `Bearer ${getToken.body.data.token}`;
}, 60000);

afterAll(async () => {
    await mongoose.disconnect();
});

describe('POST /api/todo', () => {
    it('should add a new todo', async () => {
        const newTodo = {
            title: "Test todo",
            description: "This is a sample"
        }
        const res = await request(app).post('/api/todo').set('Authorization', token).send(newTodo);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe(newTodo.title);
    });
});

describe('POST /api/todo', () => {
    it('should update todo', async () => {
        const newTodo = {
            title: "New todo title",
        }
        const res = await request(app).put(`/api/todo/${todo.id}`).set('Authorization', token).send(newTodo);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe(newTodo.title);
    });
});

describe('GET /api/todo', () => {
    it('should get todo list', async () => {
        const res = await request(app).get('/api/todo').set('Authorization', token).send();
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /api/todo', () => {
    it('should get todo by id', async () => {
        const res = await request(app).get(`/api/todo/${todo.id}`).set('Authorization', token).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(todo.id);
    });
});

describe('DELETE /api/todo', () => {
    it('should delete todo by id', async () => {
        const res = await request(app).delete(`/api/todo/${todo.id}`).set('Authorization', token).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(todo.id);
    });
});



describe('GET /api/analytics', () => {
    it('should get analytics list', async () => {
        const res = await request(app).get('/api/analytics').set('Authorization', token).send();
        expect(res.statusCode).toBe(200);
    });
});