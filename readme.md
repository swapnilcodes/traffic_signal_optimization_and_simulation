
Traffic  congestion has become a serious worry in cities around the world,
owing to rising population growth, fast urbanization, and an increase in the number of vehicles on the road.

One of the biggest reasons of intersection congestion is the employment of antiquated fixed time traffic signal
control systems, which run on predetermine, static schedule that do not take real life traffic circumstances
into consideration. 

In this era of smart cars, We have access to a tremendous amount of real time traffic data.
Engineers have used this data to create traffic light controlling algorithms which are significantly more efficient. 
But what they lack is a viable platform to test these algorithms. 
A software which can simulate real-life traffic conditions, which can enable us to create custom maps
while also being able to import real maps, which can connect to hardware mini-cars and relay boards 
to project the efficiency of these algorithms.



List of features offered by the solution:
Custom map making
importing maps from Google maps
Simulating Virtual Traffic on any of the aforementioned maps.
Integrating real hardware mini cars and traffic lights.
Test traffic light controlling algorithms using the aforementioned simulations.  

Tech stack: React ts, electron, google maps api.
Hardware: esp32, rs485 relay board. 

to start the desktop app:
go to the simulator-app folder and run:
npm run dev:react
In another tab run:
npm run dev:electron
