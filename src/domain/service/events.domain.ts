import { inject, injectable } from "inversify";
import { EventsDomainDTO } from "../dto/events.domain.dto";
import { EventEntity } from "../entity/EventEntity";
import { IEvent } from "../interface/events.domain.interface";
import { Intercept } from "../../crossCutting/intercept/intercept";
import { EventsRepositoryDTO } from "../../data/dto/repository/events.repository.dto";
import { DATA_TYPES } from "../../data/dataTypes";
import { generateSlug } from "../../utils/generate-slyg";

@injectable()
export class EventsDomain implements EventsDomainDTO {
    constructor(@inject(DATA_TYPES.eventsRepository) private readonly eventsRepository: EventsRepositoryDTO) {}

    createEvent = async (event: IEvent): Promise<EventEntity> => {
        const slug = generateSlug(event.title);

        const eventWithSameSlug = await this.getEventBySlug(slug);

        new Intercept('badRequest').boolean(!!eventWithSameSlug, `Já existe um evento com o slug ${slug}`)

        return new EventEntity({
            details: event.details,
            maximumAttendees: event.maximumAttendees,
            title: event.title,
            slug,
        })
    }

    private getEventBySlug = async (slug: string): Promise<EventEntity | null> => {
        return await this.eventsRepository.getEventBySlug(slug);
    }

    saveEvent = async (event: EventEntity): Promise<EventEntity> => {
        return await this.eventsRepository.saveEvent(event);
    }
}