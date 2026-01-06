import type { Road } from "./Road"
import type {Point} from './Point';

export type Map = {
    name: string,
    id: string,
    // A hashmap of roadId's to their values
    roads: {
        [key: string]: Road
    }
    startingPoints: Point[],
    endingPoints: Point[]
};
