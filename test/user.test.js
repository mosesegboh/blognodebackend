const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const {app} = require('../server')
const {appAuth} = require('../authServer')
const User = require("../models/User")

chai.use(chaiHttp)

let defaultUser = {
    email: "richardsimpson@yahoo.com",
    password: "dangerman",
    confirmPassword: "dangerman",
    fullName: "moses egboh",
    birthDate: "1987-05-21",
    isAdmin: true
}

// let registerUser = {
//     email: "richardsimpson@yahoo.com",
//     password: "dangerman",
//     confirmPassword: "dangerman",
//     fullName: "moses egboh",
//     birthDate: "1987-05-20",
//     isAdmin: true
// }

let loginUser = {
    email: "richardsimpson@yahoo.com",
    password: "dangerman",
}

let token

        // afterEach(done => {
        //   // After each test we truncate the database
        //   User.remove({}, err => {
        //     done();
        //   });



// beforeEach((done) => {
//     //clear the database which we do not need to do.
//     // User.deleteMany({}, function(err){})
//     //authenticate the user and get the token
//     // //register a user
//     // chai
//     // .request(appAuth)
//     // .post("/api/register")
//     // .send(defaultUser)
//     // .end((err, res) => {
//     //   res.should.have.status(200);
//     // })
   

//     //login the user
//     // chai
//     //     .request(appAuth)
//     //     .post("/api/login")
//     //     .send(defaultUser)
//     //     .end((err, res) => {
//     //     token = res.body.token;
//     //     res.should.have.status(200);
//     //     })
//     done();
// })

// before((done) => {
//     //clear the database which we do not need to do.
//     // User.deleteMany({}, function(err){})
//     //authenticate the user and get the token
//     //register a user
//     chai
//         .request(appAuth)
//         .post("/api/register")
//         .send(defaultUser)
//         .end((err, res) => {
//             // console.log(res);
//         res.should.have.status(200);
//     });

//     //login the user
//     // chai
//     //     .request(appAuth)
//     //     .post("/api/login")
//     //     .send(loginUser)
//     //     .end((err, res) => {
//     //     token = res.body.token;
//     //     res.should.have.status(200);
//     //     })
//     done();
// })

// after((done) => {
//     User.deleteMany({}, function(err){})
//     done();
// })
//login
describe("/reigster a user", () => {
    it('test the register route', () => {
        chai
            .request(appAuth)
            .post("/api/register")
            .send(defaultUser)
            .end((err, res) => {
            token = res.body.token;
            console.log(err, 'error 1')
            // res.should.have.status(200);
            res.status.should.be.equal(200);
        })
    })
}) 

  describe("/login a user", () => {
        it('test the login route', () => {
            chai
                .request(appAuth)
                .post("/api/login")
                .send(loginUser)
                .end((err, res) => {
                token = res.body.token;
                console.log(err, 'error 2')
                // res.should.have.status(200);
                res.status.should.be.equal(200);
            })
        })
    }) 

describe('First Test Collection', () => {
    // it('it should test the default server route', (done) => {
    //     chai.request(app)
    //     .get('/')
    //     .end((err,res) => {
    //         res.should.have.status(200)
    //         res.body.should.be.a('object')
    //         console.log(res.body.message)
    //         const actualValue = res.body.message
    //         expect(actualValue).to.be.equal("the regular server has been hit")
    //         done()
    //     })
    // })
    // describe("/register a user", () => {
    //     it('test the register route', () => {
    //         chai
    //             .request(appAuth)
    //             .post("/api/register")
    //             .send(registerUser)
    //             .end((err, res) => {
    //             res.should.have.status(200);
    //         })
    //     })
    // }) 

    describe("/get users", () => {
        it("should fetch all users successfully", () => {
            chai
            .request(appAuth)
            .get("/api/users")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                // res.should.have.status(200);
                res.status.should.be.equal(200);
                res.body.should.be.a("object");
                console.log(err, 'error 3')
                //res.body.should.have.property("users");
            })
        })
    }) 
})