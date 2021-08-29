import React from 'react'

interface Props {
  data: string;
  room: string;
  roomSensors: number[];
  currentUnit: string;
  sensors: {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    units: string;
  }[];
  readings: {
    time:string;
    sensorId: number;
    value: number;
  }[]
}

const Graph = (props: Props) => {

  console.log("sensors", props.sensors)
  console.log("readings", props.readings)

  return (
    <div>
      {props.data}
      {props.currentUnit}
    </div>
  )
}

export default Graph
