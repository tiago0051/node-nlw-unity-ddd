export interface ICreateEventsData {
    title: string;
    description: string;
    maximumAttendees?: number;
}

export interface ICreateEventsReturn {
    product: {
        id: string;
        title: string;
        description: string;
        maximumAttendees?: number;
        slug: string;
    }
}