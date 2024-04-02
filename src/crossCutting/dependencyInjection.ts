import {Container} from "inversify";
import { EventsPresentationDTO } from "../presentation/dto/events.presentation.dto";
import { PRESENTATION_TYPES } from "../presentation/presentationTypes";
import { EventsPresentation } from "../presentation/services/events.presentation";
import { EventsApplicationDTO } from "../application/dto/events.application.dto";
import { APPLICATION_TYPES } from "../application/applicationTypes";
import { EventsApplication } from "../application/service/events.application";
import { EventsDomainDTO } from "../domain/dto/events.domain.dto";
import { DOMAIN_TYPES } from "../domain/domainTypes";
import { EventsDomain } from "../domain/service/events.domain";
import { EventsRepository } from "../data/service/repository/events.repository";
import { DATA_TYPES } from "../data/dataTypes";
import { PrismaProvider } from "../data/provider/prisma.provider";
import { EventsRepositoryDTO } from "../data/dto/repository/events.repository.dto";
import { PrismaClient } from "@prisma/client";

export class InjectionContainer {
    public container: Container;

    constructor() {
        this.container = new Container();

        const prismaProvider = new PrismaProvider();

        this.container.bind<EventsPresentationDTO>(PRESENTATION_TYPES.events).to(EventsPresentation);

        this.container.bind<EventsApplicationDTO>(APPLICATION_TYPES.events).to(EventsApplication);

        this.container.bind<EventsDomainDTO>(DOMAIN_TYPES.events).to(EventsDomain);

        this.container.bind<EventsRepositoryDTO>(DATA_TYPES.eventsRepository).to(EventsRepository);

        this.container.bind<PrismaClient>(DATA_TYPES.prismaProvider).toConstantValue(prismaProvider.prisma);
    }
}