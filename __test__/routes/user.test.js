import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

chai.use(chaiHttp);
chai.should();

export default function () {
  it('POST: Should be login', async () => {
    await chai
      .request(app)
      .post('/login')
      .send({
        email: 'mike@horsepower.at',
        password: '123456',
      })
      .then((res) => {
        expect(res).to.have.status(204);
        expect(res).to.have.header('x-auth-token');
      });
  });
}
