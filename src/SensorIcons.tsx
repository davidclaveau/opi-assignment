import Sensor from './Sensor';
import { currentSensor } from './utils/currentSensor';

interface Props {
  onChange:any;
  room: string;
  image: string;
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
};

interface ISensors {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  units: string;
}

const SensorIcons = (props: Props) => {
  // Find the sensors tied to this room, create new array to render Sensor component
  const sensorArray:ISensors[] = currentSensor(props.roomSensors, props.sensors)
  
  // Get readings for specific sensor, providing the most recent readings
  const getRecent = (specificId:number) => {
    const temperatures = props.readings.filter(reading => reading.sensorId === specificId )
    
    // Find most recent temperature
    const hottestTemp = temperatures.sort((a, b) => new Date(a.time) > new Date(b.time) ? -1 : new Date(a.time) < new Date(b.time) ? 1 : 0)
    
    return hottestTemp.length > 0 ? hottestTemp[0].value : "No readings";
  }
  
  return (
    <div>
      <div className="room-title">{props.room}</div>
      <img src={props.image} alt="Avatar" onClick={() => props.onChange(props.room)}/>    
      <div className="measurement-container">  
        {sensorArray.map(sensor => {
          return (
            <Sensor
              key={sensor.id}
              name={sensor.name}
              type={sensor.type}
              createdAt={sensor.createdAt}
              units={sensor.units}
              temperature={getRecent(sensor.id)}
              currentUnit={props.currentUnit}
            />
          )
        })}
      </div>
    </div>
  );
}

export default SensorIcons
