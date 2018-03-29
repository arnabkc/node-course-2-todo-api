const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');

const seedUsers = [{
    name: 'Test User 1',
    city: 'Bengaluru',
    country: 'India'
}, {
    name: 'Test User 2',
    city: 'Palo Alto',
    country: 'USA'
}, {
    name: 'Test User 3',
    city: 'London',
    country: 'United Kingdom'
}];

beforeEach((done) => {
    User.remove({}).then(() => {
        return User.insertMany(seedUsers);
    }).then(() => done());    
});

describe('POST /user', () => {
    it('Should create a user', (done) => {
        var name = 'Aritro';
        var city = 'Bengaluru';
        var country = 'India';

        request(app)
            .post('/user')
            .send({
                name, 
                city,
                country   
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(name)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({name}).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].name).toBe(name);

                    done();
                }).catch((err) => done(err));
            }); 
    });

    it('Should not create user', (done) => {
        var name = 'Sanjib';

        request(app)
            .post('/user')
            .send({
                name
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((users) => {
                    expect(users.length).toBe(3);
                    done();
                }).catch((err) => done(err));
            });

    });
});

describe('GET /users', () => {
    it('Should get all users', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(3)
            })
            .end(done);
    });
});