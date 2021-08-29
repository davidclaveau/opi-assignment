import { useState, useEffect } from 'react';
import Units from './Units';
import SensorIcons from './SensorIcons';
import Graph from './Graph';

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
  const [rooms, setRooms] = useState([
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

    // Converting string date to UTC human-readable
    // const newDate1 = new Date("2020-01-01T00:03Z")
    // newDate1.toUTCString()
    
  return (
    <div>
      <h1>Current Readings</h1>

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
              data={data}
              room={room.name}
              roomSensors={room.roomSensors}
              sensors={sensors}
              readings={readings}
              currentUnit={currentUnit}
            />
          )
        })}
      </div>


    </div>
  )
}

export default Dashboard
