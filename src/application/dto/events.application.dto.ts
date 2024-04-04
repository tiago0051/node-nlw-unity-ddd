import {
  type IRegisterForEventData,
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventReturn,
} from "../interface/events.application.interface";

export interface EventsApplicationDTO {
  createAttendees: (data: IRegisterForEventData) => Promise<IRegisterForEventReturn>;
  createEvents: (data: ICreateEventsData) => Promise<ICreateEventsReturn>;
}
