import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
const { default: app } = await import('../app.js');

describe('Users API', () => {
    let token;
    let userId;

    it('should register a new user', (done) => {
        chai.request(app)
            .post('/api/users/register')
            .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should login a user', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({ email: 'john@example.com', password: 'password123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should get all users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a user by ID', (done) => {
        chai.request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'password123' })
            .end((err, res) => {
                userId = res.body.id;

                chai.request(app)
                    .get(`/api/users/${userId}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('name', 'Jane Doe');
                        expect(res.body).to.have.property('email', 'jane@example.com');
                        done();
                    });
            });
    });

    it('should update a user by ID (admin only)', (done) => {
        chai.request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Jane Smith', email: 'janesmith@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Jane Smith');
                expect(res.body).to.have.property('email', 'janesmith@example.com');
                done();
            });
    });

    it('should delete a user by ID (admin only)', (done) => {
        chai.request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
