const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /GET getAllotedCourses
describe("/GET getAllotedCourses", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/courses/getAllotedCourses")
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
      .get("/courses/getAllotedCourses")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8"
      )
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /GET getCourseDetails
describe("/GET getCourseDetails", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/courses/getCourseDetails?courseId=CSE5006")
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
      .get("/courses/getCourseDetails?courseId=CSE5006")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8"
      )
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /addStudentToCourse
describe("/POST addStudentToCourse", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/courses/addStudentToCourse")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        studentId: "18BCI0212",
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
      .post("/courses/addStudentToCourse")
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        studentId: "18BCI0212",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /removeStudentFromCourse
describe("/POST removeStudentFromCourse", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/courses/removeStudentFromCourse")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        studentId: "18BCI0212",
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
      .post("/courses/removeStudentFromCourse")
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        studentId: "18BCI0212",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /addCourse
describe("/POST addCourse", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/courses/addCourse")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: new Date().getTime(),
        courseName: "Advanced Testing",
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
      .post("/courses/addCourse")
      .set("Content-Type", "application/json")
      .send({
        courseId: "TEST1001",
        courseName: "Advanced Testing",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /getPeers
describe("/GET getPeers", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/courses/getPeers?courseId=CSE5006")
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
  it("it should return 401", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/courses/getPeers")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
