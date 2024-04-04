import z from "zod";
import { Entity } from "./Entity";

const attendeeEntitySchema = z.object({
  name: z.string().min(5).max(191),
  email: z.string().email().max(191),
  eventId: z.string().uuid(),
});

export class AttendeeEntity extends Entity implements z.infer<typeof attendeeEntitySchema> {
  public name: string;
  public email: string;
  public eventId: string;

  constructor(props: Omit<AttendeeEntity, "id">, id?: string) {
    super(id);

    (this.name = props.name), (this.email = props.email);
    this.eventId = props.eventId;
  }
}
