import mitt, { Emitter, EventType } from 'mitt';

type CustomEvents = Record<EventType, any>;

interface EventBus extends Emitter<CustomEvents> {}

const eventBus: EventBus = mitt<CustomEvents>();

export default defineNuxtPlugin(() => {
    return {
        provide: {
            eventBus: eventBus,
        },
    };
});

export { eventBus };