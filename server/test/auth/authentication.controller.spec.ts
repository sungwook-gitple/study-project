import { expect } from "chai";
import supertest from "supertest";

import app from "@/src/app";
import { routeAuth } from '../../src/components/auth/auth.controller';
import { StatusCodes } from "http-status-codes";

describe("Authentication", () => {
  const agent = supertest.agent(app);

  const token = 'test-token'

  before(() => {

    const authenticateService = {
      authenticate: async (...arg: any[]) => ({
        user: {
          username: 'test',
        },
        token: 'test-token',
      } as any)
    } as any;

    routeAuth(app, { authenticateService });
  })

  it("before login check auth", async () => {

    const response = await agent.get("/authCheck")
      .expect(StatusCodes.OK)

    expect(response.body.message).to.be.equal('fail');
  })

  it("login has cookies", async () => {

    const response = await agent.post("/signIn")
      .expect(StatusCodes.OK)

    const cookie = response.headers['set-cookie']

    expect(cookie[0]).to.include(`token=${token}`);

    expect(response.body).to.deep.equal({
      message: 'success',
      token,
      username: 'test',
    });
  })

  it("after login check auth", async () => {

    const response = await agent.get("/authCheck")
      .expect(StatusCodes.OK)

    expect(response.body.message).to.be.equal('success');
  })

  it("[logout] should return status 200", async () => {
    const result = await agent.delete("/signOut")
      .expect(StatusCodes.OK)

    const cookie = result.headers['set-cookie']

    expect(cookie).not.to.exist;
    expect(result.body).to.deep.equal({
      message: 'success'
    });
  })
});
