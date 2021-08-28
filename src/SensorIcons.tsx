import React from 'react'
import Sensor from './Sensor'


interface Props {
  room: string;
  image: string;
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


const SensorIcons = (props: Props) => {
  
  // Get readings for specific sensor, providing the most recent readings
  const getHottest = (specificId:number) => {
    const temperatures = props.readings.filter(reading => reading.sensorId === specificId )
  
    // Find most recent temperature
    const hottestTemp = temperatures.sort((a, b) => new Date(a.time) > new Date(b.time) ? -1 : new Date(a.time) < new Date(b.time) ? 1 : 0)
    
    return hottestTemp.length > 0 ? hottestTemp[0].value : "No readings";
  }

  return (
    <div>
      <div className="room-title">{props.room}</div>
      <img src={props.image} alt="Avatar" />
      <table className="tableClass">
        <tbody>
          <tr>
            <th>Sensor Name</th>
            <th>Sensor Type</th>
            <th>Temperature</th>
          </tr>
            {props.sensors.map(sensor => {
              return (
                <Sensor
                  key={sensor.id}
                  name={sensor.name}
                  type={sensor.type}
                  createdAt={sensor.createdAt}
                  units={sensor.units}
                  temperature={getHottest(sensor.id)}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  )
}

export default SensorIcons
