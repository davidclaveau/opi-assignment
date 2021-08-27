import React from 'react'

interface Props {
  key: number;
  name: string;
  type: string;
  createdAt: string;
  units: string
}

const Sensor = (props: Props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.units}</td>
    </tr>
  )
}

export default Sensor
