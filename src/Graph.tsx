import React from 'react'
import { currentSensor } from './utils/currentSensor';


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

interface ISensors {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  units: string;
}

const Graph = (props: Props) => {
  // Find the sensors tied to this room, create new array to render Sensor component
  const test:ISensors[] = currentSensor(props.roomSensors, props.sensors)

  console.log("test", test)

  return (
    <div>
      {props.data}
      {props.currentUnit}
    </div>
  )
}

export default Graph
