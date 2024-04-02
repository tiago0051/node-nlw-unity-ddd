export interface ICreateEventsData {
    title: string;
    details?: string;
    maximumAttendees?: number;
}

export interface ICreateEventsReturn {
    event: {
        id: string;
        title: string;
        details: string | null;
        maximumAttendees?: number | null;
        slug: string;
    }
}