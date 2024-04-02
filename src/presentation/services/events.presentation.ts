import "reflect-metadata"
import { type FastifyInstance } from "fastify";
import { type EventsPresentationDTO } from "../dto/events.presentation.dto";
import { type ICreateEventsBody } from "../interface/events.presentation.interface";
import { inject, injectable } from "inversify";
import { EventsApplicationDTO } from "../../application/dto/events.application.dto";
import { APPLICATION_TYPES } from "../../application/applicationTypes";

@injectable()
export class EventsPresentation implements EventsPresentationDTO {
    constructor(@inject(APPLICATION_TYPES.events) private readonly eventsApplication: EventsApplicationDTO) {}

    createEvents = async (fastify: FastifyInstance) => {
        fastify.post<{Body: ICreateEventsBody}>('/', async (request, reply) => {
            const {body} = request;

            const data = await this.eventsApplication.createEvents({
                description: body.description,
                title: body.title,
                maximumAttendees: body.maximumAttendees
            })
        
            return reply.status(201).send(data);
        })
    }
    
}