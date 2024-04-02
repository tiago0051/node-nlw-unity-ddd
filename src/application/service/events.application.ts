import { inject, injectable } from "inversify";
import { EventsApplicationDTO } from "../dto/events.application.dto";
import { ICreateEventsData, ICreateEventsReturn } from "../interface/events.application.interface";
import z from "zod";
import { Intercept } from "../../crossCutting/intercept/intercept";
import { EventsDomainDTO } from "../../domain/dto/events.domain.dto";
import { DOMAIN_TYPES } from "../../domain/domainTypes";

@injectable()
export class EventsApplication implements EventsApplicationDTO {
    constructor(@inject(DOMAIN_TYPES.events) private readonly eventsDomain: EventsDomainDTO) {}

    private validateCreateEventSchema = z.object({
        title: z.string().min(5).max(191),
        details: z.string().min(5),
        maximumAttendees: z.number().int().positive()
    }).partial({
        details: true,
        maximumAttendees: true,
    })

    createEvents = async (data: ICreateEventsData): Promise<ICreateEventsReturn> => {
        new Intercept("badRequest").zod(this.validateCreateEventSchema, data);

        const {details, title, maximumAttendees} = data;

        let event = await this.eventsDomain.createEvent({
            title,
            details: details ?? null,
            maximumAttendees: maximumAttendees ?? null
        })

        event = await this.eventsDomain.saveEvent(event);

        return {
            event
        }
    }

}