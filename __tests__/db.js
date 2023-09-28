//supertest to send http requests to servers and get response
import request from 'supertest';
import response from 'supertest';
const server = 'http://localhost:3030';
import pool from '../server/database/userDatabase.ts'; // Your PostgreSQL connection pool

describe('Auth', () => {
  describe('signup', () => {
    it('should create a new user', () => {
      return request(server)
        .post('/login/signupRequest')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(response.statusCode).toBe(200)
        .expect(response.body).toHaveProperty('message', 'you are logged in');
    });
  });

  describe('login', () => {
    it('should log in a user', () => {
      return request(server)
        .post('/login/loginRequest')
        .send({
          email: 'hello',
          password: 'world',
        })
        .expect(response.statusCode)
        .toBe(401)
        .expect(response.body)
        .toHaveProperty('message', 'Invalid credentials');
    });
    it('should send an error if incorrect', () => {
      return request(server)
        .post('/login/loginRequest')
        .send({
          email: 'hello',
          password: 'world1',
        })
        .expect(response.statusCode)
        .toBe(401)
        .expect(response.body)
        .toHaveProperty('error', 'Invalid Username or Password');
    });
  });
});
