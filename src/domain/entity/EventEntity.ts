import z from "zod";

import { Entity } from "./Entity";
import { Intercept } from "../../crossCutting/intercept/intercept";

const eventEntitySchema = z.object({
  details: z.string().min(5).max(191).nullable(),
  maximumAttendees: z.number().int().positive().nullable(),
  slug: z.string().min(5).max(191),
  title: z.string().min(5).max(191),
  amountAttendees: z.number().int().positive().nullable(),
});

export class EventEntity extends Entity implements z.infer<typeof eventEntitySchema> {
  public amountAttendees: number;
  public details: string;
  public maximumAttendees: number;
  public slug: string;
  public title: string;

  constructor(props: Omit<EventEntity, "id">, id?: string) {
    super(id);

    Object.assign(this, props);

    new Intercept("badRequest").zod(eventEntitySchema, this);
  }
}
