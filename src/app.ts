import fastify, { type FastifyInstance } from "fastify";

import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { InjectionContainer } from "./crossCutting/dependencyInjection";
import { Router } from "./crossCutting/router";

export class App {
  public readonly app: FastifyInstance;

  constructor() {
    this.app = fastify();

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    const myContainer = new InjectionContainer();

    const router = new Router(myContainer.container);
    router.init(this.app);
  }
}
