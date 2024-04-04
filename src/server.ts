import fastify from "fastify";
import { Router } from "./crossCutting/router";
import { InjectionContainer } from "./crossCutting/dependencyInjection";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const myContainer = new InjectionContainer();

const router = new Router(myContainer.container);
router.init(app);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
