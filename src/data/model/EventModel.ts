export class EventModel {
    public readonly id: string;

    public title: string;

    public details: string | null;

    public maximumAttendees: number | null;

    public slug: string;

    constructor(props: EventModel) {
        this.id = props.id;
        this.title = props.title;
        this.details = props.details;
        this.maximumAttendees = props.maximumAttendees;
        this.slug = props.slug;
    }
}