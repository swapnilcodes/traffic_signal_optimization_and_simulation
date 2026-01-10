import type { Road } from "./Road"

export type Map = {
    name: string,
    id: string,
    // A hashmap of roadId's to their values
    roads: {
        [key: string]: Road
    }
};
