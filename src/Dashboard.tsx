import React, { useState } from 'react';

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

// Fetch request for readings
api<[{time:string; sensorId: number; value: number}]>('api/v1/readings.json')
  .then((response) => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

// Fetch request for sensors
api<[{id: number; name: string; type: string; createdAt: Date; units: string}]>('api/v1/sensors.json')
  .then((response) => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })


const Dashboard = (props: Props) => {

  return (
    <div>
      This is where the dashboard is rendered.
    </div>
  )
}

export default Dashboard
