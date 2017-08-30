let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../server'),
    app = require('../server'),
    massive = require('massive'),
    config = require('./config2'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    db = app.get('db'),
    should = chai.should();

chai.use(chaiHttp);
app.set('db', massiveInstance),

    describe('mainCtrl', () => {

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
                    expect(res.body[0].type).to.be.a('string');
                    done();
                })
        })

        it('it should authenticate a user', done => {
            chai.request(server)
                .get('/api/me')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should login a user', done => {
            let user = {
                username: 'dude23',
                password: '123'
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should check if a user is logged in', done => {
            chai.request(server)
                .get('/api/checklogin')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should get the cart by customer id', done => {
            chai.request(server)
                .get('/api/cart/:id')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should add an item to the cart', done => {
            let item = {
                name: 'name',
                desc: 'desc',
                image: 'image',
                price: 24,
                type: 'type'
            }
            chai.request(server)
                .post('/api/addtocart')
                .send(item)
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })


        it('it should logout a user', done => {
            chai.request(server)
                .get('/api/logout')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })

        it('it should add a new user', done => {

            let user = {
                firstname: 'dude',
                lastname: 'man',
                email: 'dude@dude.com',
                username: 'dude23',
                password: '123'
            }

            chai.request(server)
                .post('/api/newuser')
                .send(user)
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    expect(res.body).to.have.property('firstname');
                    expect(res.body.firstname).to.not.equal(null);
                    done();
                })
        })
        it('it should delete item from cart with a given id', done => {
            chai.request(server)
                .delete('/api/delete/:id')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should delete all items from cart', done => {
            chai.request(server)
                .delete('/api/deleteall')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })
        it('it should update the product id cart quantity ', done => {
            chai.request(server)
                .get('/api/updatequantity')
                .end((err, res) => {
                    expect(res).to.be.ok;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.ok;
                    done();
                })
        })


    })

