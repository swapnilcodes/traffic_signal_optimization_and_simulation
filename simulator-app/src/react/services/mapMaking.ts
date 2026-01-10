import type {Point} from '../models/Point';
import type {Road} from '../models/Road';
import type {Map} from '../models/Map';
import { RoadTypes } from '../models/Road.ts';

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
    if(map.roads[roadId].left) map.roads[roadId].left.right = undefined;
    if(map.roads[roadId].right) map.roads[roadId].right.left = undefined;
    if(map.roads[roadId].up) map.roads[roadId].up.down = undefined;
    if(map.roads[roadId].down) map.roads[roadId].down.up = undefined;
    delete map.roads[roadId];
    return map;
}

function rotateRoadBlock(map: Map, roadId: string): Map{
    // Performing dfs to rotate all connected roads
    let stack: ( Road | undefined ) [] = [map.roads[roadId]];
    let i = 0; 
    while(stack.length > 0){
        console.log(i)
        i++;
        let road = stack.pop();
        if (!road) continue;
        console.log(road.tilt); 
        if(road.tilt === 90) {
            road.tilt = 0; 
            const width = (road.end.y - road.start.y);
            road.start.x = road.start.x - (width/2);
            road.end.x = road.start.x + width;
            road.start.y = (road.start.y + road.end.y) / 2; // Midpoint Formula
            road.end.y = road.start.y + 6; // 9 is the constant used for non considered dimension of the size of the road;
        }
        else {
            road.tilt = 90;
            const width = (road.end.x - road.start.x);

            road.start.y =  road.start.y - (width/2);
            road.end.y = road.start.y + width;

            road.start.x = (road.start.x + road.end.x) / 2; 
            road.end.x = road.start.x + 6;

            console.log(road);
        }
        
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
    if (newRoad.start.x !== parentRoad.end.x + 1) {
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
    if(newRoad.end.x !== parentRoad.start.x-1){
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
    if (newRoad.end.y !== parentRoad.start.y-1){
        throw Error('Cannot add this road above. Vertical Distance between them must be 1');
    }    
    if(!( newRoad.start.x >= parentRoad.start.x && newRoad.end.x <= parentRoad.end.x )){
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
    if (newRoad.start.y !== parentRoad.end.y + 1){
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

export {
    insertNewRoad,
    deleteRoad,
    rotateRoadBlock,
    addRoadToRight,
    addRoadToLeft,
    addRoadAbove, 
    addRoadBelow
};

