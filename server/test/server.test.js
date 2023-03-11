const request = require('supertest');
const server  = require('../src/server')

it("get the test group with id 1", () => {
  return request(server).get("/group/1")
      .expect("content-type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
            expect.objectContaining({
              title       : expect.any(String),
              name        : expect.any(String),
              description : expect.any(String),
              participants: expect.arrayContaining([ expect.any(String) ]),
              expenses    : expect.arrayContaining([ expect.any(Object) ]),
              id          : 1
            })
        )
      })
})