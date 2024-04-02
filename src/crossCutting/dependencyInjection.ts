import {Container} from "inversify";
import { EventsPresentationDTO } from "../presentation/dto/events.presentation.dto";
import { PRESENTATION_TYPES } from "../presentation/presentationTypes";
import { EventsPresentation } from "../presentation/services/events.presentation";
import { EventsApplicationDTO } from "../application/dto/events.application.dto";
import { APPLICATION_TYPES } from "../application/applicationTypes";
import { EventsApplication } from "../application/service/events.application";

export class InjectionContainer {
    public container: Container;

    constructor() {
        this.container = new Container();

        this.container.bind<EventsPresentationDTO>(PRESENTATION_TYPES.events).to(EventsPresentation);

        this.container.bind<EventsApplicationDTO>(APPLICATION_TYPES.events).to(EventsApplication);
    }
}