import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  key: number;
  name: string;
  type: string;
  createdAt: string;
  units: string;
  temperature: any;
  currentUnit: string;
}

const Sensor = (props: Props) => {
  let visibleUnit:string = "";
  let visibleTemp:any = props.temperature;

  // Change unit that shows based on what the sensor provides
  // Or changed by currentUnit setting
  switch (props.units) {
    case "Celsius":
      visibleUnit = " °C"
      break;
    case "Fahrenheit":
      visibleUnit = " °F"
      break;
    case "%":
      visibleUnit = "%"
      break;
    default:
      break;
  }

  // Check if the current setting is celsius or fahrenheit, convert temperature
  // And change visibleUnit to F
  if (props.currentUnit === "fahrenheit" && props.units === "Celsius" && typeof props.temperature === "number") {
    visibleTemp = (props.temperature * 1.8) + 32
    visibleUnit = " °F"
  }

  return (
    <div className="measurement-items">
      {props.type === "Temperature Sensor" && 
        <Tooltip title="Temperature">
          <IconButton aria-label="temperature">
            <FontAwesomeIcon icon={faTemperatureHigh} size='lg'  className="temperature-padding"/>
          </IconButton>
        </Tooltip>
      }
      {props.type === "Humidity Sensor" &&
        <Tooltip title="Humidity">
          <IconButton aria-label="humidity">
            <InvertColorsIcon fontSize={'large'}/>
          </IconButton>
        </Tooltip>
      }
      
      {typeof visibleTemp === "number" ? Math.round(visibleTemp * 10) / 10 : "None"}
      {visibleTemp === "No readings" ? "" : visibleUnit}

      
    </div>
  )
}

export default Sensor
