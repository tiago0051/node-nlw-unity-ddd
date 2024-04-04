import { Entity } from "./Entity";

export class AttendeeEntity extends Entity {
  public name: string;
  public email: string;
  public eventId: string;

  constructor(props: Omit<AttendeeEntity, "id">, id?: string) {
    super(id);

    (this.name = props.name), (this.email = props.email);
    this.eventId = props.eventId;
  }
}
