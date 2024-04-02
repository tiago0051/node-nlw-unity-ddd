import { EventEntity } from "../entity/EventEntity";
import { IEvent } from "../interface/events.domain.interface";

export interface EventsDomainDTO {
    createEvent: (eventToCreate: IEvent) => Promise<EventEntity>
    saveEvent: (event: EventEntity) => Promise<EventEntity>;
}