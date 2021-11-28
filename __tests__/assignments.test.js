const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /addAssignment end point
describe("/POST addAssignment", () => {
  it("it should add an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/addAssignment")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .field("Content-Type", "multipart/form-data")
      .field("fileName", "test.pdf")
      .field("assignmentTitle", "Test assignment")
      .field("courseId", "CSE5006")
      .field("assignmentDeadline", "12 January")
      .attach("file", __dirname + "/assets/test.pdf")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);

  it("it should not upload assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/addAssignment")
      .field("Content-Type", "multipart/form-data")
      .field("fileName", "test.pdf")
      .field("assignmentTitle", "Test assignment")
      .field("courseId", "TEST1001")
      .field("assignmentDeadline", "12 January")
      .attach("file", __dirname + "/assets/test.pdf")
      .end((err, res) => {
        res.should.have.status(503);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /viewAssignment end point
describe("/GET viewAssignments", () => {
  it("it should view an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/viewAssignments?courseId=CSE5006")
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

  it("it should not view an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/viewAssignments?courseId=CSE5006")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /submitAssignment end point
describe("/POST submitAssignment", () => {
  it("it should submit an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/submitAssignment")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIFBhcmVraCIsInN0dWRlbnRJZCI6IjE4QkNJMDIxMiIsImlhdCI6MTYzNzY0OTgzNH0.gaCTxefhEUUVNXVHRVDL5Q4Tq3fXurqnb2Rb61lI7U8`
      )
      .set("Content-Type", "multipart/form-data")
      .field("fileName", "test.pdf")
      .field("courseId", "CSE5006")
      .attach("file", __dirname + "/assets/test.pdf")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);

  it("it should not submit an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/submitAssignment")
      .field("Content-Type", "multipart/form-data")
      .field("fileName", "test.pdf")
      .field("courseId", "CSE5006")
      .attach("file", __dirname + "/assets/test.pdf")
      .end((err, res) => {
        res.should.have.status(503);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /viewSubmission end point
describe("/GET viewSubmission", () => {
  it("it should view a submission", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/viewSubmission?courseId=CSE5006")
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

  it("it should not view a submission", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/viewSubmission?courseId=CSE5006")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// // test case for /gradeAssignment end point
describe("/POST gradeAssignment", () => {
  it("it should grade an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/gradeAssignment")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        courseId: "CSE5006",
        studentId: "18BCI0212",
        score: 100,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);

  it("it should not grade an assignment", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/assignments/gradeAssignment")
      .set("Content-Type", "application/json")
      .field("courseId", "CSE5006")
      .field("studentId", "18BCI0212")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /student/allAssignments end point
describe("/GET student/allAssignments", () => {
  it("it should view all assignments", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/student/allAssignments")
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

  it("it should not view all assignments", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/student/allAssignments")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});

// test case for /teacher/allAssignments end point
describe("/GET teacher/allAssignments", () => {
  it("it should view all assignments", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/teacher/allAssignments")
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

  it("it should not view all assignments", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/assignments/teacher/allAssignments")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  }).timeout(10000);
});
