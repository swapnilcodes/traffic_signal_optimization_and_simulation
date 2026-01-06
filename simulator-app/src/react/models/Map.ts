import type { Road } from "./Road"
import type {Point} from './Point';

export type Map = {
    mapName: string,
    mapId: string,
    // A hashmap of roadId's to their values
    roads: {
        [key: string]: Road
    }
    startingPoints: Point[],
    endingPoints: Point[]
};
