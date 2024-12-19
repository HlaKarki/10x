// Define event types using discriminated unions
type EventMap = {
    'user:login': { userId: string; timestamp: Date };
    'user:logout': { userId: string; timestamp: Date };
    'user:profile-updated': { userId: string; timestamp: Date; changes: Record<string, any> };
    'payment:processed': {
        orderId: string;
        amount: number;
        status: 'success' | 'failed';
    };
};

// Custom error class for event-related errors
class EventError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EventError';
    }
}

// Type-safe event emitter
class TypedEventEmitter {
    private listeners: {
        [K in keyof EventMap]?: Array<(data: EventMap[K]) => void>;
    } = {};

    // Type-safe event subscription
    on<K extends keyof EventMap>(
        eventName: K,
        handler: (data: EventMap[K]) => void
    ): void {
        if (typeof handler !== 'function') {
            throw new EventError(`Event handler must be a function, got ${typeof handler}`)
        }

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName]?.push(handler);
    }

    // only triggers a handler one time
    once<K extends keyof EventMap>(
        eventName: K,
        handler: (data: EventMap[K]) => void
    ): void {
        const wrappedHandler = (data: EventMap[K]) => {
            // Remove the handler before calling it
            this.off(eventName, wrappedHandler);
            handler(data);
        };

        this.on(eventName, wrappedHandler);
    }

    // Type-safe event emission
    emit<K extends keyof EventMap>(
        eventName: K,
        data: EventMap[K]
    ): void {
        const handlers = this.listeners[eventName];

        if (!handlers?.length) {
            console.warn(`No handlers registered for event: ${eventName}`);
            return;
        }
        handlers.forEach(handler => {
            try {
                handler(data)
            } catch (error) {
                console.error(`Error in handler for ${eventName}:`, error);
            }
        });
    }



    // list all registered event types
    list(): { eventName: string, listenerCount: number }[] {
        return Object.entries(this.listeners).map(([eventName, listenerCount]) =>
            ({ eventName, listenerCount: listenerCount?.length ?? 0 }))
    }

    // Utility to remove event listener
    off<K extends keyof EventMap>(
        eventName: K,
        handler: (data: EventMap[K]) => void
    ): void {
        if (!this.listeners[eventName]) {
            throw new EventError(`No listeners registered for event: ${eventName}`);
        }

        this.listeners[eventName] = this.listeners[eventName]?.filter(
            h => h !== handler
        );
    }
}

// Example usage
const events = new TypedEventEmitter();

// TypeScript will enforce correct event payload types
events.on('user:login', (data) => {
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

events.on('payment:processed', (data) => {
    if (data.status === 'success') {
        console.log(`Order ${data.orderId} processed successfully: $${data.amount}`);
    }
});

// This would cause a type error:
// events.emit('user:login', { wrongField: 'value' });

// Correct usage:
events.emit('user:login', {
    userId: '123',
    timestamp: new Date()
});


// Test

// Testing once method
events.once('user:login', (data) => {
    console.log(`One-time handler: User ${data.userId} logged in`);
});

// Testing regular subscription
events.on('user:profile-updated', (data) => {
    console.log(`Profile updated for user ${data.userId}:`, data.changes);
});

// Testing error handling
try {
    events.emit('user:login', {
        userId: '123',
        timestamp: new Date()
    });
} catch (error) {
    if (error instanceof EventError) {
        console.error('Event error:', error.message);
    }
}

// Testing list method
console.log('Registered events:', events.list());