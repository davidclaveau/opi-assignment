import { useState, useEffect } from 'react';
import Sensor from './Sensor'
import Units from './Units'
import './Dashboard.css'

interface Props {

}

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
    units: "",
    temperatures: {
      time: "",
      sensorId: 0,
      value: 0,
    }
  }])

  useEffect(() => {
    // Fetch request for readings
    const readingsPromise = api<[{time:string; sensorId: number; value: number}]>('api/v1/readings.json')

    // Fetch request for sensors
    const sensorsPromise = api<[{id: number; name: string; type: string; createdAt: string; units: string; temperatures: {time: string; sensorId: number; value: number}}]>('api/v1/sensors.json')

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

    // Get readings for specific sensor, providing the most recent readings
    const getHottest = (specificId:number) => {
      const temperatures = readings.filter(reading => reading.sensorId === specificId )

      // Find most recent temperature
      const hottestTemp = temperatures.sort((a, b) => new Date(a.time) > new Date(b.time) ? -1 : new Date(a.time) < new Date(b.time) ? 1 : 0)
      
      return hottestTemp.length > 0 ? hottestTemp[0].value : "No readings";
    }
    
    // Converting string date to UTC human-readable
    // const newDate1 = new Date("2020-01-01T00:03Z")
    // newDate1.toUTCString()
    
  return (
    <div>
      <h1>Current Readings</h1>

      <Units />

      <table className="tableClass">
        <tbody>
          <tr>
            <th>Sensor Name</th>
            <th>Sensor Type</th>
            <th>Temperature</th>
          </tr>
            {!loading && sensors.map(sensor => {
              return (
                <Sensor
                  key={sensor.id}
                  name={sensor.name}
                  type={sensor.type}
                  createdAt={sensor.createdAt}
                  units={sensor.units}
                  temperature={getHottest(sensor.id)}
                />
              );
            })}
        </tbody>
      </table>

    </div>
  )
}

export default Dashboard
