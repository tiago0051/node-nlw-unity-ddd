import {
  type IRegisterForEventData,
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventReturn,
} from "../interface/events.application.interface";

export interface EventsApplicationDTO {
  createEvents: (data: ICreateEventsData) => Promise<ICreateEventsReturn>;
  createAttendees: (
    data: IRegisterForEventData
  ) => Promise<IRegisterForEventReturn>;
}
