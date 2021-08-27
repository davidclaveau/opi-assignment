import React, { useState, useEffect } from 'react';
import Sensor from './Sensor'
import './App.css'

interface Props {

}

interface ISensor {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  units: string
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
  const [readings, setReadings] = useState([{}])
  const [sensors, setSensors] = useState([{
    id: 0,
    name: "",
    type: "",
    createdAt: "",
    units: ""
  }])

  useEffect(() => {
    // Fetch request for readings
    api<[{time:string; sensorId: number; value: number}]>('api/v1/readings.json')
      .then((response) => {
        setReadings(response)
      })
      .catch(error => {
        console.log(error)
      })

    // Fetch request for sensors
    api<[{id: number; name: string; type: string; createdAt: string; units: string}]>('api/v1/sensors.json')
      .then((response) => {
        setSensors(response)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    const sensorMap = sensors.map(sensor => {
      return (
        <Sensor
          key={sensor.id}
          name={sensor.name}
          type={sensor.type}
          createdAt={sensor.createdAt}
          units={sensor.units}
        />
      );
    })

  return (
    <div>
      Current Readings

      <br></br>
      <br></br>

      <table className="tableClass">
        <tbody>
          <tr>
            <th>Sensor Name</th>
            <th>Sensor Type</th>
            <th>Units</th>
          </tr>
            {sensorMap}
        </tbody>
      </table>

    </div>
  )
}

export default Dashboard
