import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';

export default function(){

    const [cars, setCars] = useState<any[]>([]);
    
    useEffect(()=>{
        setCars([
            {
                name: 'car1'
            },
            {
                name: 'car2',
            }, 
            {
                name: 'car3'
            }
        ]);
    }, []);

    return (
        <div style={{display: 'flex-box', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}>
            <h1 style= {{textAlign: 'center', margin: '30px 0'}}>Cars</h1>
            <h1 style={{textAlign: 'center', marginTop: '50px'}}>
                Integrate real mini-cars
            </h1>
            {
                cars.map((car)=>{
                    return (
                        <div style={{
                            width: '100px', 
                            height: '100px',
                            border: '2px solid black',
                            display: 'grid',
                            alignItems: 'center', 
                            justifyItems: 'center',
                            margin: '40px 0'
                        }}>
                            <h2>{car.name}</h2>                             
                            <Button variant='contained' style={{backgroundColor: "green"}}>
                                Test
                            </Button>
                        </div>
                    );
                })
            }
        </div>
    );
}
