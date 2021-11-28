const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// test case for /POST addStudent
describe("/POST addStudent", () => {
  it("it should return 200 and expected response for teacher", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .post("/utility/addStudent")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWxpIFBhcmVraCIsInRlYWNoZXJJZCI6IlRFQUNIMDEiLCJpYXQiOjE2Mzc2NDc4NDF9.AzXO9pO8h9MdSDdirBUwJySj5boomAZXTlI86o4-3ZI`
      )
      .set("Content-Type", "application/json")
      .send({
        name: "Test Student",
        email: `test${Math.floor(Math.random() * 1000000)}@test.com`,
        studentId: "STU001" + Math.floor(Math.random() * 1000000),
      })

      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);
});
