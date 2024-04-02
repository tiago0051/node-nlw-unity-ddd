import z from "zod";
import { Entity } from "./Entity";
import { Intercept } from "../../crossCutting/intercept/intercept";

const eventEntitySchema = z.object({
    title: z.string().min(5).max(191),
    details: z.string().min(5).max(191).nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
    slug: z.string().min(5).max(191)
})

export class EventEntity extends Entity implements z.infer<typeof eventEntitySchema> {
    public title: string;

    public details: string | null;

    public maximumAttendees: number | null;

    public slug: string;

    constructor(props: z.infer<typeof eventEntitySchema>, id?: string) {
        super(id)

        new Intercept('badRequest').zod(eventEntitySchema, props);

        this.title = props.title;
        this.details = props.details;
        this.maximumAttendees = props.maximumAttendees;
        this.slug = props.slug;
    }
}