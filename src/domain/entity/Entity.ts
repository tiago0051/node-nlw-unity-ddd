import {v4} from "uuid"
import z from "zod";
import { Intercept } from "../../crossCutting/intercept/intercept";

const entitySchema = z.object({
    id: z.string().uuid()
})

export class Entity implements z.infer<typeof entitySchema> {
    public readonly id: string;

    constructor(id?: string) {
        if (!id) this.id = v4()
        else this.id = id;

        new Intercept("badRequest").zod(entitySchema, this);
    }
}