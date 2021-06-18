export interface userData {
    id: string;
    email: string;
    password: string;
}

export interface userInteraction {
    eventType: string;
    userId: string;
    eventSource: string;
}
export interface userInteractionData {
    id: string;
    eventType: string;
    userId: string;
    eventSource: string;
}