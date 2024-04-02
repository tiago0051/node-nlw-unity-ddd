import { FastifyInstance } from "fastify";
import { EventsPresentationDTO } from "../presentation/dto/events.presentation.dto";
import { PRESENTATION_TYPES } from "../presentation/presentationTypes";
import { Container } from "inversify";
import { exceptionErrorHandle } from "./intercept/exception/exceptionErrorHandle";

export class Router {
    constructor(private readonly container: Container) {}
    init = async(fastify: FastifyInstance): Promise<void> => {
        fastify.setErrorHandler(exceptionErrorHandle)

        const eventsPresentation = this.container.get<EventsPresentationDTO>(PRESENTATION_TYPES.events);

        await fastify.register(eventsPresentation.createEvents, {
            prefix: "events"
        })
    }
}