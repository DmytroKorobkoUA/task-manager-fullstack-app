import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
const { default: app } = await import('../app.js');

describe('Tasks API', () => {
    let token;
    let taskId;

    before(async () => {
        await chai.request(app)
            .post('/api/users/register')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

        const loginRes = await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password123' });

        token = loginRes.body.token;
    });

    it('should create a new task', (done) => {
        chai.request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Learn Express.js', completed: false })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Express.js');
                expect(res.body).to.have.property('completed', false);
                taskId = res.body.id; // Сохраняем ID созданной задачи
                done();
            });
    });

    it('should get all tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a task by ID', (done) => {
        chai.request(app)
            .get(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Express.js');
                done();
            });
    });

    it('should update a task by ID', (done) => {
        chai.request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Learn Advanced Node.js', completed: true })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Advanced Node.js');
                expect(res.body).to.have.property('completed', true);
                done();
            });
    });

    it('should delete a task by ID', (done) => {
        chai.request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
