const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("/GET test", () => {
  it("it should return 200 and expected response", (done) => {
    chai
      .request("https://edurizon.herokuapp.com")
      .get("/test")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("projectName");
        done();
      });
  }).timeout(10000);
});
