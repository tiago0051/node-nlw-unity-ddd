import { ICreateEventsData, ICreateEventsReturn } from "../interface/events.application.interface";

export interface EventsApplicationDTO {
    createEvents: (data: ICreateEventsData) => Promise<ICreateEventsReturn>
}