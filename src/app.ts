import fastify, { type FastifyInstance } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { InjectionContainer } from "./crossCutting/dependencyInjection";
import { Router } from "./crossCutting/router";

export class App {
  public readonly app: FastifyInstance;

  constructor() {
    this.app = fastify();

    this.app.register(fastifySwagger, {
      swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
          title: "pass.in",
          description: "Especificações da API para o back-end da aplicação pass.io desenvolvida no NLW Unite",
          version: "1.0.0",
        },
        tags: [
          {
            name: "event",
          },
        ],
      },
      transform: jsonSchemaTransform,
    });

    this.app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    const myContainer = new InjectionContainer();

    const router = new Router(myContainer.container);
    router.init(this.app);
  }
}
