import { type FastifyInstance } from "fastify";
import { type Container } from "inversify";

import { type EventsPresentationDTO } from "../presentation/dto/events.presentation.dto";

import { PRESENTATION_TYPES } from "../presentation/presentationTypes";
import { exceptionErrorHandle } from "./intercept/exception/exceptionErrorHandle";

export class Router {
  constructor(private readonly container: Container) {}
  init = async (fastify: FastifyInstance): Promise<void> => {
    fastify.setErrorHandler(exceptionErrorHandle);

    const eventsPresentation = this.container.get<EventsPresentationDTO>(PRESENTATION_TYPES.events);

    await fastify.register(
      async (instance) => {
        await eventsPresentation.createEvents(instance);
        await eventsPresentation.registerForEvent(instance);
      },
      {
        prefix: "events",
      },
    );
  };
}
