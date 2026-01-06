import {useState} from 'react';
import Button from '@mui/material/Button';

interface ToolBoxProps {
    onAddRoad: ()=>any,
    onDeleteRoad: ()=>any,
};

export default function({onAddRoad, onDeleteRoad}: ToolBoxProps){

    return (
        <div style={{
            position: 'fixed',
            left: '15px',
            top: '12vh',
            width: '10vw',
            height: '80vh',
            backgroundColor: 'rgb(40, 40, 40)',
            display: 'grid', 
            alignItems: 'center',
            justifyContent: 'center' 
        }}>
            <Button variant='outlined' 
                style={{
                    width: '7vw',
                    minHeight: '40px',
                    color: 'white',
                    border: '1px solid crimson'
                }}
                onClick={(e)=>onAddRoad()}
            >
                Add Road
            </Button>             
            <Button variant='outlined' 
                style={{
                    width: '7vw',
                    minHeight: '40px',
                    color: 'white',
                    border: '1px solid crimson'
                }}>
                Del Road
            </Button>
            
        </div>
    );
}
