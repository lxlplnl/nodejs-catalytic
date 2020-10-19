import { it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

chai.use(chaiHttp);

export default function () {
  it('GET   : Health Check', async () => {
    return chai
      .request(app)
      .get('/api/health-check')
      .then(function (res) {
        expect(res.body).to.be.nested.contain({ Health_Check: 'OK' });
      });
  });

  it('POST  : Register', () => {
    return chai
      .request(app)
      .post('/api/register')
      .send({
        email: 'jane@catalytic.com',
        password: '123456',
        firstName: 'Jane',
        lastName: 'Doe',
      })
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('_id', 'email', 'firstName', 'lastName');
        expect(res.body).to.have.not.keys('password');
        expect(res).to.have.header('x-auth-token');
      });
  });

  it('POST  : Login', () => {
    return chai
      .request(app)
      .post('/api/login')
      .send({ email: 'jane@catalytic.com', password: '123456' })
      .then((res) => {
        expect(res.status).to.be.eql(204);
        expect(res).to.have.header('x-auth-token');
      });
  });

  it('POST  : Login inValid', () => {
    return Promise.all([
      chai
        .request(app)
        .post('/api/login')
        .send({ email: 'john.com', password: '123456' })
        .then((res) => {
          expect(res.status).to.be.eql(400);
          expect(res).to.have.not.header('x-auth-token');
        }),
      chai
        .request(app)
        .post('/api/login')
        .send({ email: 'jane@catalytic.com', password: '1****6' })
        .then((res) => {
          expect(res.status).to.be.eql(400);
          expect(res).to.have.not.header('x-auth-token');
        }),
      chai
        .request(app)
        .post('/api/login')
        .send({ email: 'john2@catalytic.com', password: '123456' })
        .then((res) => {
          expect(res.status).to.be.eql(400);
          expect(res).to.have.not.header('x-auth-token');
        }),
    ]);
  });
}
