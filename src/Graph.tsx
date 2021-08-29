import { useMemo, useState } from 'react'
import { currentSensor } from './utils/currentSensor';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
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
  selected: {
    backgroundColor: "green"
  }
}));


const Graph = (props: Props) => {
  const classes = useStyles();
  const [unit, setUnit] = useState("Temperature Sensor")
  const [tempSelected, setTempSelected] = useState(true)
  const [humSelected, setHumSelected] = useState(false)

  // Toggle which button is highlighted on click
  // Material-UI drawback: difficulty adding style that overrides default
  const buttonClick = (unit:string) => {
    if (unit === "Temperature Sensor")  {
      setTempSelected(true)
      setHumSelected(false)
    }
    if (unit === "Humidity Sensor")  {
      setHumSelected(true)
      setTempSelected(false)
    }
    setUnit(unit)
  }

  // Find the sensors tied to this room, create new array to render Sensor component
  const sensorArray:ISensors[] = currentSensor(props.roomSensors, props.sensors)

  const data = useMemo(
    () => {
      let graphData: { label: string; data: (number | Date | undefined)[][];}[] = [];

      // Convert units based on celsius or farenheit
      const calculateUnits = (value:number, sensorUnits:string) => {
        if (props.currentUnit === "farenheit" && sensorUnits === "Celsius" && typeof value === "number") {
          const number:number = ((value * 1.8) + 32)
          return number;
        }

        return value;
      }
      
      // Loop through the room's sensors and find corresponding readings
      // Create the data variable with label and data values
      for (const sensor of sensorArray) {
        const test = props.readings.filter(reading => reading.sensorId === sensor.id && unit === sensor.type)
    
        graphData.push({
          label: sensor.name,
          data:
            test.map((reading: { time: string | number | Date; value: number; }) => {
              return (
                [new Date(reading.time), calculateUnits(reading.value, sensor.units)] 
              )
            })
        })
      }

      return graphData
    },
    [props.currentUnit, props.readings, sensorArray, unit]
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
        <Button className={`${classes.button} ${tempSelected? classes.selected : ""}`} variant="contained" color="primary" disableElevation onClick={() => buttonClick("Temperature Sensor")}>
            <FontAwesomeIcon icon={faTemperatureHigh} size="2x" className="temperature-padding"/>
        </Button>
        <Button className={`${classes.button} ${humSelected? classes.selected : ""}`} variant="contained" color="primary" disableElevation onClick={() => buttonClick("Humidity Sensor")}>
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
