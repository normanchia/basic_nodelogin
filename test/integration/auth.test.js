// Integration Test 1: Successful Authentication
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../login");

chai.use(chaiHttp);

describe("POST /auth", () => {
  it("should authenticate user with correct credentials", (done) => {
    chai
      .request(app)
      .post("/auth")
      .send({ username: "test", password: "test" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("loggedin", true);
        done();
      });
  });
});

// Integration Test 2: Failed Authentication

describe("POST /auth", () => {
  it("should reject user with incorrect credentials", (done) => {
    chai
      .request(app)
      .post("/auth")
      .send({ username: "invalidUser", password: "wrongPassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("Incorrect Username and/or Password!");
        done();
      });
  });
});
