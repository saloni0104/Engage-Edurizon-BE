const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /POST add/question
describe("/POST add/question", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/add/question")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "application/json")
      .send({
        title: "Test Question",
        description: "Test description",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/add/question")
      .set("Content-Type", "application/json")
      .send({
        title: "Test Question",
        description: "Test description",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /POST add/answer
describe("/POST add/answer", () => {
  it("it should return 500 as its invalid question id", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/add/answer")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "application/json")
      .send({
        questionId: "5e7e5f0f2d9d9c1b5d5b9c7e",
        answer: "Test Answer",
      })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/add/answer")
      .set("Content-Type", "application/json")
      .send({
        questionId: "5e7e5f0f2d9d9c1b5d5b9c7e",
        answer: "Test Answer",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /GET /myquestions
describe("/GET /myquestions", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/qanda/myquestions")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/qanda/myquestions")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /DELETE /delete
describe("/DELETE /delete", () => {
  it("it should return 500 and as its invalid question id", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/delete")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "application/json")
      .send({
        questionId: "5e7e5f0f2d9d9c1b5d5b9c7e",
      })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/qanda/delete")
      .set("Content-Type", "application/json")
      .send({
        questionId: "5e7e5f0f2d9d9c1b5d5b9c7e",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /GET /search
describe("/GET /search", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/qanda/search?q=test")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
