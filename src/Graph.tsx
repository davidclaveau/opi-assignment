import { useMemo } from 'react'
import { currentSensor } from './utils/currentSensor';
const { Chart } = require('react-charts');


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
  const sensorArray:ISensors[] = currentSensor(props.roomSensors, props.sensors)

  const data = useMemo(
    () => {
      let graphData: { label: string; data: (number | Date)[][];}[] = [];
      
      // Loop through the room's sensors and find corresponding readings
      // Create the data variable with label and data values
      for (const sensor of sensorArray) {
        const test = props.readings.filter(reading => reading.sensorId === sensor.id)
        console.log("test", test)
    
        graphData.push({
          label: sensor.name,
          data:
            test.map((reading: { time: string | number | Date; value: number; }) => {
              return (
                [new Date(reading.time), reading.value] 
              )
            })
        })
      }

      return graphData
    },
    [props.readings, sensorArray]
  )
 
  const axes = useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '40em',
        height: '20em'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )

  return (lineChart)
}

export default Graph
