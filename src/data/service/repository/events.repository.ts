import { inject, injectable } from "inversify";
import { EventsRepositoryDTO } from "../../dto/repository/events.repository.dto";
import { EventModel } from "../../model/EventModel";
import { PrismaClient } from "@prisma/client";
import { DATA_TYPES } from "../../dataTypes";

@injectable()
export class EventsRepository implements EventsRepositoryDTO {
    constructor(@inject(DATA_TYPES.prismaProvider) private readonly prisma: PrismaClient) {}

    getEventBySlug = async (slug: string): Promise<EventModel | null> => {
        const eventDB = await this.prisma.event.findUnique({
            where: {
                slug
            }
        })

        return eventDB && new EventModel(eventDB)
    }
    
    saveEvent = async (event: EventModel): Promise<EventModel> => {
        const eventDB = await this.prisma.event.upsert({
            where: {
                id: event.id,
            },
            create: event,
            update: event
        })

        return new EventModel(eventDB);
    }
}