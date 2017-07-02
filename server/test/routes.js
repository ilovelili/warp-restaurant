const supertest = require('supertest');
const app = require('../app');
const suite = supertest(app);

const test = require('tape');

test('GET /', t => {
    'use strict';
    suite
        .get('/health')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) {
                t.fail(err);
                t.end();
            } else {
                t.ok(res.body, 'It should have a response body');
                t.equals(res.body.healthy, true, 'It should return a healthy parameter and it should be true');
                t.end();
            }
        });
});

// Ensure we get the proper 404 when trying to GET an unknown route
test('GET unknown route', t => {
    'use strict';
    suite
        .get(`/${Math.random() * 10}`)
        .expect(404)
        .end((err, res) => {
            if (err) {
                t.fail(err);
                t.end();
            } else {
                t.end();
            }
        });
});