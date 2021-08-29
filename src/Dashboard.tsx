import { useState, useEffect } from 'react';
import Units from './Units';
import SensorIcons from './SensorIcons';
import Graph from './Graph';
import Button from '@material-ui/core/Button';

import './Dashboard.css';

interface Props {

}

// Function for making a fetch call to public/api/v1
function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}

const Dashboard = (props: Props) => {
  const [loading, setLoading]  = useState(true)
  const [readings, setReadings] = useState([{
    time: "",
    sensorId: 0,
    value: 0
  }])
  const [sensors, setSensors] = useState([{
    id: 0,
    name: "",
    type: "",
    createdAt: "",
    units: ""
  }])
  const [rooms] = useState([
    {
      name: "Living Room",
      image: "../images/minh-pham-living-room.jpg",
      roomSensors: [1, 2]
    },
    {
      name: "Garage",
      image: "../images/tyler-nix-garage.jpg",
      roomSensors: [3, 4] 
    }
  ])
  const [currentUnit, setCurrentUnit] = useState("celsius")
  const [data, setData] = useState("")

  useEffect(() => {
    // Fetch request for readings
    const readingsPromise = api<[{time:string; sensorId: number; value: number}]>('api/v1/readings.json')

    // Fetch request for sensors
    const sensorsPromise = api<[{id: number; name: string; type: string; createdAt: string; units: string;}]>('api/v1/sensors.json')

    Promise.all([
      Promise.resolve(readingsPromise),
      Promise.resolve(sensorsPromise)
    ]).then(all => {
      setReadings(all[0])
      setSensors(all[1])
    }).then(() => {
      setLoading(false)
    })

    }, [])
    
  return (
    <div className="main-container">
      <Units onChange={(unit:string) => setCurrentUnit(unit)}/>
      <div className="sensors-container">
        {!loading && rooms.map(room => {
          return (
            <SensorIcons
              key={room.name}
              room={room.name}
              image={room.image}
              roomSensors={room.roomSensors}
              sensors={sensors}
              readings={readings}
              currentUnit={currentUnit}
              onChange={(data:string) => {setData(data)}}
            />
          )
        })}
      </div>
      <div className="graph-container">
        {!loading && data && rooms.filter(room => room.name === data).map(room => {
          return (
            <Graph
              key={room.name}
              room={room.name}
              roomSensors={room.roomSensors}
              data={data}
              sensors={sensors}
              readings={readings}
              currentUnit={currentUnit}
              />
              )
            })}
        {data && 
          <div>
            <Button variant="contained" color="primary" disableElevation onClick={() => setData("")}>Close</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Dashboard
