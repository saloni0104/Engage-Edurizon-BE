const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /generatePassword end point
describe("/POST generatePassword", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    const data = {
      teacherId: "TEACH01",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/generatePassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);

  it("it should return 200 and expected response for student", (done) => {
    const data = {
      studentId: "18BCI0212",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/generatePassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);
});

// test case for /setPassword end point
describe("/POST setPassword", () => {
  it("it should return 500 with no updation as pwSetToken is not there for teacher", (done) => {
    const data = {
      isTeacher: true,
      password: "1234567",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/setPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);

  it("it should return 500 with no updation as pwSetToken is not there for student", (done) => {
    const data = {
      isTeacher: false,
      password: "1234567",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/setPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /login end point
describe("/POST login", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    const data = {
      teacherId: "TEACH01",
      password: "1234567",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  }).timeout(10000);

  it("it should return 200 and expected response for student", (done) => {
    const data = {
      studentId: "18BCI0212",
      password: "1234567",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  }).timeout(10000);

  it("it should return 400", (done) => {
    const data = {
      teacherId: "TEACH01",
      password: "123456",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);

  it("it should return 400", (done) => {
    const data = {
      studentId: "18BCI0212",
      password: "123456",
    };
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/auth/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
