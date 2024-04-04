import z from "zod";

import { Entity } from "./Entity";
import { Intercept } from "../../crossCutting/intercept/intercept";

const eventEntitySchema = z.object({
  details: z.string().min(5).max(191).nullable(),
  maximumAttendees: z.number().int().positive().nullable(),
  slug: z.string().min(5).max(191),
  title: z.string().min(5).max(191),
});

export class EventEntity extends Entity implements z.infer<typeof eventEntitySchema> {
  public details: string | null;
  public maximumAttendees: number | null;
  public slug: string;
  public title: string;

  constructor(props: z.infer<typeof eventEntitySchema>, id?: string) {
    super(id);

    new Intercept("badRequest").zod(eventEntitySchema, props);

    this.details = props.details;
    this.maximumAttendees = props.maximumAttendees;
    this.slug = props.slug;
    this.title = props.title;
  }
}
