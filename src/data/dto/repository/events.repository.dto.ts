import { EventModel } from "../../model/EventModel";

export interface EventsRepositoryDTO {
    getEventBySlug: (slug: string) => Promise<EventModel | null>
    saveEvent: (event: EventModel) => Promise<EventModel>
}