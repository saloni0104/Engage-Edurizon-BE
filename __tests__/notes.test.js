const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /POST saveNotes
describe("/POST saveNotes", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/notes/saveNotes")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        notes: "Test Notes",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 200 and expected response for student", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/notes/saveNotes")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "application/json")
      .send({
        notes: "Test Notes",
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
      .post("/notes/saveNotes")
      .set("Content-Type", "application/json")
      .send({
        notes: "Test Notes",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /GET getNotes
describe("/GET getNotes", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/notes/getNotes")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
  it("it should return 200 and expected response for student", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/notes/getNotes")
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
  });
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/notes/getNotes")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
