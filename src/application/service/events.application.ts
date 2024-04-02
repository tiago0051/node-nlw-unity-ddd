import { injectable } from "inversify";
import { EventsApplicationDTO } from "../dto/events.application.dto";
import { ICreateEventsData, ICreateEventsReturn } from "../interface/events.application.interface";
import z from "zod";
import { Intercept } from "../../crossCutting/intercept/intercept";

@injectable()
export class EventsApplication implements EventsApplicationDTO {
    private validateCreateEventSchema = z.object({
        title: z.string().min(5).max(191),
        description: z.string().min(5).nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })

    createEvents = async (data: ICreateEventsData): Promise<ICreateEventsReturn> => {
        new Intercept("badRequest").zod(this.validateCreateEventSchema, data);

        const {description, title, maximumAttendees} = data;
    }

}