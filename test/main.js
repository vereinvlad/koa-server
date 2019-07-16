process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let Server = require('../core/Server');
let app = require('../core/App');
const config = require('../config');
  
chai.should();

chai.use(chaiHttp);

var Cookies;


describe('Application', () => {
  let api;
  
  before(async () => {
    await app.init();
    let server = new Server(app);
    api = await server.start(config.appPort);
  });

  after(() => {
    api.close();
  });
  describe('POST', () => {
    it('it should user found', done => {
      chai
        .request(api)
        .post('/signIn')
        .send({
          login: 'vlad',
          password: '123'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          Cookies = res.header['set-cookie'];
          done();
        });
    });
    it('it should not user found', done => {
      chai
        .request(api)
        .post('/signIn')
        .send({
          login: 'vla',
          password: '123'
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('it should add idea', done => {
      let req = chai.request(api).post('/ideasCards');
      req.cookies = Cookies;
      req
        .send({
          title: "eqweq",
          description: "dasdasdaasdasaaaq"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title', 'eqweq');
          res.body.should.have.property('description', 'dasdasdaasdasaaaq');
          done();
        });
    });

  })

  describe('/GET', () => {
    it('should GET ideas if user login', done => {
      let req = chai.request(api).get('/ideasCards');
      req.cookies = Cookies;
      req
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not GET ideas if user not login', done => {
      let req = chai.request(api).get('/ideasCards');
      req
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  })
});
