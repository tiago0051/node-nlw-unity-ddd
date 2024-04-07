export interface ICreateEventsData {
  title: string;
  details: string;
  maximumAttendees: number;
}

export interface ICreateEventsReturn {
  event: {
    id: string;
    title: string;
    details: string;
    maximumAttendees: number;
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

export interface IGetAttendeeBadgeReturn {
  badge: {
    attendeeEmail: string;
    attendeeId: string;
    attendeeName: string;
    eventTitle: string;
    checkInURL: string;
  };
}

export interface IGetEventReturn {
  event: {
    id: string;
    title: string;
    details: string;
    maximumAttendees: number;
    slug: string;
  };
}

export interface IGetEventAttendeesReturn {
  attendees: {
    id: string;
    name: string;
    email: string;
    checkedInAt: Date;
    createdAt: Date;
  }[];
}
