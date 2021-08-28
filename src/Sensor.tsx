import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import InvertColorsIcon from '@material-ui/icons/InvertColors';

interface Props {
  key: number;
  name: string;
  type: string;
  createdAt: string;
  units: string;
  temperature: any;
}

const Sensor = (props: Props) => {
  let unit:string = "";

  switch (props.units) {
    case "Celsius":
      unit = " C"
      break;
    case "Farenheit":
      unit = " F"
      break;
    case "%":
      unit = "%"
      break;
    default:
      break;
  }

  return (
    <div className="measurement-items">
      {props.type === "Temperature Sensor" && 
          <FontAwesomeIcon icon={faTemperatureHigh} size='2x' className="temperature-padding"/>
      }
      {props.type === "Humidity Sensor" &&
       <InvertColorsIcon fontSize={'large'}/>
      }
      
      {typeof props.temperature === "number" ? Math.round(props.temperature * 10) / 10 : "None"}
      {props.temperature === "No readings" ? "" : unit}
    </div>
  )
}

export default Sensor
