process.env.NODE_ENV = 'test';
const request = require('supertest');
const express = require('express');
const router = require('./books');
const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /', () => {
  test('It should respond with an array of books', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.books)).toBe(true);
  });
});

describe('POST /', () => {
  test('It should create a new book', async () => {
    const newBook = {
      isbn: '1234567890',
      amazon_url: 'https://example.com',
      author: 'Test Author',
      language: 'English',
      pages: 200,
      publisher: 'Test Publisher',
      title: 'Test Book',
      year: 2021
    };
    const response = await request(app)
      .post('/')
      .send({ book: newBook });
    expect(response.status).toBe(201);
    expect(response.body.book).toMatchObject(newBook);
  });

  });

