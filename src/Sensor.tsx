import React from 'react'

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
    <tr>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>
        {typeof props.temperature === "number" ? Math.round(props.temperature * 10) / 10 : props.temperature}
        {props.temperature === "No readings" ? "" : unit}
      </td>
    </tr>
  )
}

export default Sensor
