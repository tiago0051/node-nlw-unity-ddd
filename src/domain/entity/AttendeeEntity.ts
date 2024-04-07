import z from "zod";
import { Entity } from "./Entity";
import { Intercept } from "../../crossCutting/intercept/intercept";

const attendeeEntitySchema = z.object({
  name: z.string().min(5).max(191),
  email: z.string().email().max(191),
  eventId: z.string().uuid(),
  checkedInAt: z.date().nullable(),
  createdAt: z.date().nullable(),
});

export class AttendeeEntity extends Entity implements z.infer<typeof attendeeEntitySchema> {
  public name: string;
  public email: string;
  public eventId: string;
  public checkedInAt: Date;
  public createdAt: Date;

  constructor(props: Omit<AttendeeEntity, "id" | "checkIn">, id?: string) {
    super(id);

    Object.assign(this, props);
    new Intercept("badRequest").zod(attendeeEntitySchema, this);
  }

  public checkIn() {
    if (!this.checkedInAt) this.checkedInAt = new Date();
  }
}
