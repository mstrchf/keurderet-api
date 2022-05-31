/*
import request from "supertest";
import app from "../../../src/index";

app.listen(5500, (): void => console.log("Listening on port 5500"));

describe("GET /users", () => {
  afterAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });
  it("returns status code 200", async () => {
    const res = await request(app).get("/users").send();
    expect(res.statusCode).toEqual(200);
  });
});
*/

function hello(str: string) {
  return `Hello World! ${str}`;
}
test("Hello world", () => {
  expect(hello("Foo")).toBe("Hello World! Foo");
});
