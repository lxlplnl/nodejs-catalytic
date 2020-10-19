import { it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

chai.use(chaiHttp);

export default function () {
  const agent = chai.request.agent(app);
  let token;

  it('POST  : Login', () => {
    return agent
      .post('/api/login')
      .send({ email: 'jane@catalytic.com', password: '123456' })
      .then((res) => {
        expect(res.status).to.be.eql(204);
        expect(res).to.have.header('x-auth-token');
        token = `Bearer ${res.headers['x-auth-token']}`;
      });
  });

  it('GET   : Me', () => {
    return agent
      .get('/api/me')
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.email).to.be.eql('jane@catalytic.com');
      });
  });

  it('GET   : With Invalid Token', () => {
    return agent
      .get('/api/me')
      .set('Authorization', 'Invalid Token')
      .then((res) => {
        expect(res.status).to.be.eql(401);
      });
  });

  it('POST  : Me - Update Password', () => {
    return agent
      .post('/api/me')
      .set('Authorization', token)
      .send({ password: '123456', newPassword: '123456' })
      .then((res) => {
        expect(res.status).to.be.eql(204);
      });
  });

  it('POST  : Me - Update Password with wrong password', () => {
    return agent
      .post('/api/me')
      .set('Authorization', token)
      .send({ password: '1234**', newPassword: '1234567' })
      .then((res) => {
        expect(res.status).to.be.eql(403);
      });
  });

  it('POST  : Me - Update Profile', () => {
    return agent
      .patch('/api/me')
      .set('Authorization', token)
      .send({ firstName: 'Jane' })
      .then((res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.firstName).to.be.eql('Jane');
      });
  });
}
