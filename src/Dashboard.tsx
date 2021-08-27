import React, { useState, useEffect } from 'react';

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
  const [readings, setReadings] = useState([{}])
  const [sensors, setSensors] = useState([{}])

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
    api<[{id: number; name: string; type: string; createdAt: Date; units: string}]>('api/v1/sensors.json')
      .then((response) => {
        setSensors(response)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

  return (
    <div>
      This is where the dashboard is rendered.
    </div>
  )
}

export default Dashboard
