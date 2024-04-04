export interface ICreateEventsData {
  title: string;
  details: string | null;
  maximumAttendees: number | null;
}

export interface ICreateEventsReturn {
  event: {
    id: string;
    title: string;
    details: string | null;
    maximumAttendees: number | null;
    slug: string;
  };
}

export interface IRegisterForEventData {
  name: string;
  email: string;
  eventId: string;
}

export interface IRegisterForEventReturn {
  attendee: {
    id: string;
    name: string;
    email: string;
    eventId: string;
  };
}
