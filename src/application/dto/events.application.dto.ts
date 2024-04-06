import {
  type IRegisterForEventData,
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventReturn,
  type IGetEventReturn,
  type IGetAttendeeBadgeReturn,
} from "../interface/events.application.interface";

export interface EventsApplicationDTO {
  createAttendees: (data: IRegisterForEventData) => Promise<IRegisterForEventReturn>;
  createEvents: (data: ICreateEventsData) => Promise<ICreateEventsReturn>;
  getAttendeeBadge: (eventId: string, attendeeId: string) => Promise<IGetAttendeeBadgeReturn>;
  getEvent: (eventId: string) => Promise<IGetEventReturn>;
}
