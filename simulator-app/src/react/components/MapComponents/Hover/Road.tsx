import {useState, useEffect} from 'react';
import type {Point} from '../../../models/Point';

interface HoverRoadProps  {
    onClick: (start: Point, end: Point)=>any,
    currentScale: number,
    bounds?: {
        start: Point,
        end: Point,
    }, 
    tilt: 90|0 
};

export default function({onClick, currentScale, bounds, tilt}:HoverRoadProps){

    // Default Width
    const size = 60;
    const [centre, setCentre] = useState<Point>({x: 0, y: 0});

    function handleMouseMove(event: MouseEvent){
        const xPercent = ( event.clientX/(document.documentElement.clientWidth/100) );
        const yPercent = ( event.clientY/(document.documentElement.clientHeight/100));
        if(!bounds) { 
            setCentre({x: xPercent, y: yPercent}); 
            return;
        }
        
        console.log('bounds: ');
        console.log(bounds);
        console.log(`xPercent: ${xPercent}, yPercent: ${yPercent}`);
        if(tilt === 90){
            if(
                xPercent - 4.5  >= bounds.start.x &&
                xPercent + 4.5  <= bounds.end.x &&
                yPercent - (size/2)  >= bounds.start.y &&
                yPercent + (size/2)  <= bounds.end.y 
            ) 
                setCentre({x: xPercent, y: yPercent});
            return;
        }
        
        if(
            xPercent - (size / 2) >= bounds.start.x &&
            xPercent + (size / 2) <= bounds.end.x &&
            yPercent - 4.5 >= bounds.start.y &&
            yPercent + 4.5 <= bounds.end.y
        )
            setCentre({x: xPercent, y: yPercent});

    }

    function handleClick(event: MouseEvent){
        window.removeEventListener('click', handleClick);
        window.removeEventListener('mousemove', handleMouseMove);
        const xPercent = (event.clientX/(document.documentElement.clientWidth/100));
        const yPercent = (event.clientY/(document.documentElement.clientHeight/100));
        onClick(
            {x: xPercent - (size /2), y: yPercent - (9/2)}, 
            {x: xPercent + (size/2), y: yPercent + (9/2)}
        );
    }

    useEffect(()=>{
        window.addEventListener('mousemove', handleMouseMove); 
        setTimeout(() => {
         window.addEventListener('click', handleClick);           
        }, 1000);
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);   
        };
    }, []);


    return (
        <div style={{
            width: tilt===0?`${( size * currentScale )}%` : `6%`, 
            height: tilt === 0 ? `${9 * currentScale}%` : `${size}%`,
            position: 'fixed',
            top: tilt === 0 ? `${centre.y - 4.5}%` : `${centre.y - (size/2)}%`,
            left: tilt === 0 ? `${centre.x - (size/2)}%` : `${centre.x - 4.5}%`,
            backgroundColor: 'rgb(60, 60, 60)',
            cursor: 'pointer'
        }}>
            
        </div>
    );
}


