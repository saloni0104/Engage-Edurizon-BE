const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /POST postMessageOrSchedule
describe("/POST postMessageOrSchedule", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/facultyUtility/postMessageOrSchedule")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        message: "Test Message",
        schedule: "12:00",
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
      .post("/facultyUtility/postMessageOrSchedule")
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        message: "Test Message",
        schedule: "12:00",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /POST updateOfficeHour
describe("/POST updateOfficeHour", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/facultyUtility/updateOfficeHour")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        startTime: "12:00",
        endTime: "13:00",
        officeHourDay: "Monday",
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
      .post("/facultyUtility/updateOfficeHour")
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        startTime: "12:00",
        endTime: "13:00",
        officeHourDay: "Monday",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
