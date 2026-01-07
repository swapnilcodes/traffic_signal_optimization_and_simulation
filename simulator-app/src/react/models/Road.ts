import type { Point } from "./Point"

export enum RoadTypes {
   SingleLane,
   DoubleLane
};


export type Road = {
    id: string,
    name: string | null,
    type: RoadTypes,
    tilt: number,
    start: Point,
    end: Point,
    left?: Road,
    right?: Road,
    up?: Road,
    down?: Road
}

