import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
const { default: app } = await import('../app.js');

describe('Admin API', () => {
    let adminToken;
    let userToken;
    let userId;

    before(async () => {
        await chai.request(app)
            .post('/api/users/register')
            .send({ name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' });

        const adminLogin = await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'admin@example.com', password: 'password123' });

        adminToken = adminLogin.body.token;

        await chai.request(app)
            .post('/api/users/register')
            .send({ name: 'Regular User', email: 'user@example.com', password: 'password123' });

        const userLogin = await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'user@example.com', password: 'password123' });

        userToken = userLogin.body.token;

        // Создаем тестового пользователя через админский маршрут
        const userRes = await chai.request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });

        userId = userRes.body.id;
    });

    it('should get all users (admin only)', (done) => {
        chai.request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should deny access to get all users for non-admins', (done) => {
        chai.request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should create a new user (admin only)', (done) => {
        chai.request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'New User', email: 'newuser@example.com', password: 'password123' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'New User');
                done();
            });
    });

    it('should update a user (admin only)', (done) => {
        chai.request(app)
            .put(`/api/admin/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Updated User', email: 'updateduser@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Updated User');
                expect(res.body).to.have.property('email', 'updateduser@example.com');
                done();
            });
    });

    it('should deny access to update a user for non-admins', (done) => {
        chai.request(app)
            .put(`/api/admin/users/${userId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'Should Not Update', email: 'shouldnotupdate@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should delete a user (admin only)', (done) => {
        chai.request(app)
            .delete(`/api/admin/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should deny access to delete a user for non-admins', (done) => {
        chai.request(app)
            .delete(`/api/admin/users/${userId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });
});
