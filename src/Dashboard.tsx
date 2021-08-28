import { useState, useEffect } from 'react';
import Sensor from './Sensor'
import Units from './Units'
import SensorIcons from './SensorIcons'
import './Dashboard.css'

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
  const [rooms, setRooms] = useState([
    {
      name: "living room",
      image: "../images/minh-pham-living-room.jpg" 
    },
    {
      name: "garage",
      image: "../images/tyler-nix-garage.jpg" 
    }
  ])
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

      <Units />
      <div className="sensors-container">\
        {!loading && rooms.map(room => {
          return (
            <SensorIcons
              room={room.name}
              image={room.image}
              sensors={sensors}
              readings={readings}
            />
          )
        })}
      </div>

    </div>
  )
}

export default Dashboard
