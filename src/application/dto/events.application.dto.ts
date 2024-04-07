import {
  type IRegisterForEventData,
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventReturn,
  type IGetEventReturn,
  type IGetAttendeeBadgeReturn,
  IGetEventAttendeesReturn,
} from "../interface/events.application.interface";

export interface EventsApplicationDTO {
  attendeeCheckIn: (eventId: string, attendeeId: string) => Promise<void>;
  createAttendees: (data: IRegisterForEventData) => Promise<IRegisterForEventReturn>;
  createEvents: (data: ICreateEventsData) => Promise<ICreateEventsReturn>;
  getAttendeeBadge: (eventId: string, attendeeId: string, baseURL: string) => Promise<IGetAttendeeBadgeReturn>;
  getEvent: (eventId: string) => Promise<IGetEventReturn>;
  getEventAttendees: (
    eventId: string,
    pageIndex: number,
    search: string,
    take: number,
  ) => Promise<IGetEventAttendeesReturn>;
}
