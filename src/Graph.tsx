import { useMemo, useState } from 'react'
import { currentSensor } from './utils/currentSensor';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(.5),
  },
}));


const Graph = (props: Props) => {
  const [unit, setUnit] = useState("Temperature Sensor")
  const classes = useStyles();

  // Find the sensors tied to this room, create new array to render Sensor component
  const sensorArray:ISensors[] = currentSensor(props.roomSensors, props.sensors)

  const data = useMemo(
    () => {
      let graphData: { label: string; data: (number | Date)[][];}[] = [];
      
      // Loop through the room's sensors and find corresponding readings
      // Create the data variable with label and data values
      for (const sensor of sensorArray) {
        const test = props.readings.filter(reading => reading.sensorId === sensor.id && unit === sensor.type)
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
    [props.readings, sensorArray, unit]
  )
 
  const axes = useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  
  return (
    <>
      <h2>{props.room}</h2>
      <div className="unit-toggle">
        <Button className={classes.button} variant="contained" color="primary" disableElevation onClick={() => setUnit("Temperature Sensor")}>
            <FontAwesomeIcon icon={faTemperatureHigh} size="2x" className="temperature-padding"/>
        </Button>
        <Button className={classes.button} variant="contained" color="primary" disableElevation onClick={() => setUnit("Humidity Sensor")}>
            <InvertColorsIcon fontSize="medium" className="humidity-padding"/>
        </Button>
      </div>
      <div className="graph">
        <Chart data={data} axes={axes} />
      </div>
    </>
  )
}

export default Graph
