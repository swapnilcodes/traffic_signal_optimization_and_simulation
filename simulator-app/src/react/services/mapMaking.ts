import type {Road} from '../models/Road';
import type {Map} from '../models/Map';
import {RoadTypes} from '../models/Road';
import type {Point} from '../models/Point';

// This File handles all data-structural operations which can be
// performed on a map.
function insertNewRoad(
    map: Map, road: Road 
): Map{ 
    map.roads[road.id] = road;
    return map;
}

function deleteRoad(
    map: Map, roadId: string
): Map {
    let road = map.roads[roadId];

    // Removing road id from all neighbours
    if(road.left){
        map.roads[road.left].right = undefined;
    } 
    if(road.right){
        map.roads[road.right].left = undefined;
    }
    if(road.up){
        map.roads[road.up].down = undefined;
    }
    if(road.down){
        map.roads[road.down].up = undefined;
    }

    delete map.roads[roadId];
    return map;
}

// Rotates a single road.
function rotateRoad(road: Road): Road{
    // Vertical to horizontal
    if(road.tilt === 90) {
        road.tilt = 0; 
        const width = (road.end.y - road.start.y);
        road.start.x = road.start.x - (width/2);
        road.end.x = road.start.x + width;
        road.start.y = (road.start.y + road.end.y) / 2; // Midpoint Formula
        road.end.y = road.start.y + 6; // 9 is the constant used for non considered dimension of the size of the road;
        return road;
    }

    // Horizontal to vertical
    road.tilt = 90;
    const width = (road.end.x - road.start.x);
    road.start.y =  road.start.y - (width/2);
    road.end.y = road.start.y + width;
    road.start.x = (road.start.x + road.end.x) / 2; 
    road.end.x = road.start.x + 6;
    return road;
}

function rotateRoadBlock(map: Map, roadId: string): Map{

    // Performing dfs to rotate all connected roads
    let stack: ( Road | undefined ) [] = [map.roads[roadId]];

    while(stack.length > 0){
        let road = stack.pop();
        if (!road) continue;

        road = rotateRoad(road);
        map.roads[roadId] = road;

        if(road.left) stack.push(map.roads[road.left]);
        if(road.right) stack.push(map.roads[road.right]);
        if(road.up) stack.push(map.roads[road.up]);
        if(road.down) stack.push(map.roads[road.down]);
    } 

    return map; 
}

function addRoadToRight(
    map: Map,
    parentRoadId: string,
    newRoad: Road,
): Map | never{
    
    // Validating Co-ordinates
    let parentRoad: Road = map.roads[parentRoadId];
    if (newRoad.start.x !== parentRoad.end.x) {
        throw Error('Cannot Add Road to left. Horizontal Distance between the two roads must be 0');
    }
    if(!( newRoad.start.y >= parentRoad.start.y && newRoad.end.y <= parentRoad.end.y)){
        throw Error('Cannot add road to left. It is not vertically inline with the parent road.');
    }
    
    // Inserting the road to right 
    newRoad.left = parentRoad.id;
    map.roads[parentRoadId].right = newRoad.id; 

    map.roads[newRoad.id] = newRoad; 

    return map;
}

function addRoadToLeft(
    map: Map,
    parentRoadId: string,
    newRoad: Road,
): Map | never {
    // Validating co-ordinates.
    let parentRoad = map.roads[parentRoadId];
    if(newRoad.end.x !== parentRoad.start.x){
        throw Error('Cannot Insert road to left. The road on the left must end where the road on the right starts');
    }  
    if(!(newRoad.start.y >= parentRoad.start.y && newRoad.end.y <= parentRoad.end.y)){
        throw Error('Cannot insert road to left. The new road is not vertically inline with the parent road.');
    }
    
    // Inserting road to left
    map.roads[parentRoadId].left = newRoad.id;
    newRoad.right = parentRoadId;
    
    map.roads[newRoad.id] = newRoad;
    return map;
}

function addRoadAbove(
   map: Map,
   parentRoadId: string,
   newRoad: Road
): Map | never{
    let parentRoad = map.roads[parentRoadId];
    if (newRoad.end.y !== parentRoad.start.y){
        throw Error('Cannot add this road above. Vertical Distance between them must be 1');
    }    
    if(!(newRoad.start.x >= parentRoad.start.x && newRoad.end.x <= parentRoad.end.x)){
        throw Error('Cannot add this road above. It isnt horizontally inline with the parent road');
    }        
    
    map.roads[parentRoadId].up = newRoad.id;
    newRoad.down = parentRoadId;
    map.roads[newRoad.id] = newRoad;

    return map;
}

function addRoadBelow(
    map: Map,
    parentRoadId: string,
    newRoad: Road
): Map | never {
    let parentRoad = map.roads[parentRoadId]; 
    if (newRoad.start.y !== parentRoad.end.y){
        throw Error('Cannot add road below. Vertical distance between the roads must be 0');
    }
    if (!(newRoad.start.x >= parentRoad.start.x && newRoad.end.x <= parentRoad.end.x)){
        throw Error('Cannot add road below. They must be horizontally inline');
    }
    
    map.roads[parentRoadId].down = newRoad.id;
    newRoad.up = parentRoadId;
    
    map.roads[newRoad.id] = newRoad;

    return map;
}

function changeRoadType(map: Map, roadId: string): Map{ 
    if(map.roads[roadId].type === RoadTypes.SingleLane){
        map.roads[roadId].type = RoadTypes.DoubleLane;
        return map;
    } 
    map.roads[roadId].type =  RoadTypes.SingleLane;
    return map;
}

function calculatePossibleBoundsForRoad(
    map: Map,
    road: Road,
): [Point, Point]{
    // If the road has no neighbours it can move freely
    if(!(
        road.left || road.right || road.down || road.up
    ))
        return [{x: 100, y: 100}, {x: 100, y: 100}];

    // If the road has neighbours horizontally as well as vertically it cant move at all.
    if(
        (road.left || road.right) &&
        (road.up || road.down)
    ) 
        return [road.start, road.end];
    
    // If the road has neighbours horizontally Only Y can be changed
    if(road.left || road.right){
        let roadLeft = road.left ? map.roads[road.left] : undefined;
        let roadRight = road.right ? map.roads[road.right] : undefined;

        let resStart: Point = {
            x: road.start.x,
            y: Math.max(
                roadLeft ? roadLeft.start.y : Number.MIN_VALUE,
                roadRight ? roadRight.start.y : Number.MIN_VALUE,
            )
        };

        let resEnd: Point = {
            x: road.start.x,
            y: Math.min(
                roadLeft ? roadLeft.end.y : Number.MAX_VALUE,
                roadRight ? roadRight.end.y : Number.MAX_VALUE
            )
        };
        return [resStart, resEnd];
    }

    // If the road has neighbours vertically. Only x can be changed
    let roadUp = road.up ? map.roads[road.up] : undefined;
    let roadDown = road.down ? map.roads[road.down] : undefined;
    let resStart: Point = {
        x: Math.max(
            roadDown ? roadDown.start.x : Number.MIN_VALUE,
            roadUp ? roadUp.start.x : Number.MIN_VALUE,
        ),
        y: road.start.y
    };
    let resEnd: Point = {
        x: Math.min(
            roadDown ? roadDown.end.x : Number.MAX_VALUE,
            roadUp ? roadUp.start.x : Number.MAX_VALUE
        ),
        y: road.end.y
    };

    return [resStart, resEnd];
}

export {
    insertNewRoad,
    deleteRoad,
    rotateRoadBlock,
    addRoadToRight,
    addRoadToLeft,
    addRoadAbove, 
    addRoadBelow,
    changeRoadType
};

