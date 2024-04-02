export interface IEvent {
    id?: string;
    title: string;
    details: string | null;
    maximumAttendees: number | null;
}