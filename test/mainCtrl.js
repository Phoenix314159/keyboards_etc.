let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../server'),
    app = require('../server'),
    massive = require('massive'),
    config = require('../config'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    db = app.get('db');
    // db = mongojs(config.mongoURI[process.env.NODE_ENV]),
    // Products = db.collection('products'),
    // ObjectId = mongojs.ObjectId;
chai.use(chaiHttp);
// let cleanDataBase = done => {
//     Products.drop((e,r) => {
//         done()
//     })
// }
app.set('db', massiveInstance),

describe('mainCtrl', () => {
    // before(cleanDataBase)      //run before all its
    // afterEach(cleanDataBase)
    // afterEach     //run after all its
    // beforeEach  //run before each it   run beforeEach and afterEach to sanitize database
    // afterEach   //run after each it    drop all data before testing hits database
    // it('expect true to equal true', () => {
    //     expect(true).to.equal(!false);
    //     expect(2 + 2).to.equal(4);
    //     expect(obj.name).to.equal('james');
    // });
    it('it should get all products', done => {
        chai.request(server)
            .get('/api/products')
            .end((err, res) => {
                expect(res).to.be.ok;
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
                expect(res.body[0].id).to.be.a('number');
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(30);
                done();
            })
    })
    it('it should get products by type', done => {
        chai.request(server)
            .get('/api/products/:type')
            .end((err, res) => {
                expect(res).to.be.ok;
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
                expect(res.body).to.be.a('array');
                done();
            })
    })
    it('it should get products by type', done => {
        chai.request(server)
            .get('/api/products/:type')
            .end((err, res) => {
                expect(res).to.be.ok;
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
                // expect(res.body[0]).to.be.a('string');
                done();
            })
    })
    // it('it should get a product by id', done => {
    //     chai.request(server)
    //         .get('/api/products/:id')
    //         .end((err, res) => {
    //             expect(res).to.be.ok;
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.ok;
    //             expect(res.body).to.be.a('object');
    //             done();
    //         })
    // })
    // it('it should get the cart by customer id', done => {
    //     chai.request(server)
    //         .get('/api/cart/:id')
    //         .end((err, res) => {
    //             expect(res).to.be.ok;
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.ok;
    //             // expect(res.body).to.be.a('object');
    //             done();
    //         })
    // })
    it('it should get the cart by customer id', done => {
        chai.request(server)
            .get('/api/cart/:id')
            .end((err, res) => {
                expect(res).to.be.ok;
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
                // expect(res.body).to.be.a('object');
                done();
            })
    })

    // it('get all products', done => {
    //     chai.request(server)
    //         .get('/api/products')
    //         .send(fakeProduct)
    //         .end((err, res) => { //designate different database for testing
    //
    //             expect(res).to.have.staus(200);
    //             expect(res.body).to.be.ok;
    //             expect(res.body.name).to.equal(fakeProduct.name);
    //
    //             expect(res.body.id).to.be.ok;
    //             let id = res.body.id;
    //
    //             Product.find({id:ObjectId(id)}, (e,r) => {
    //                 expect(r).to.be.ok;
    //                 expect(r[0].name).to.equal(fakeProduct.name);
    //                 done();
    //             })
    //
    //         })
    // })
})

