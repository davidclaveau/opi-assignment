import Sensor from './Sensor';

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

const SensorIcons = (props: Props) => {

  
  // Get readings for specific sensor, providing the most recent readings
  const getRecent = (specificId:number) => {
    const temperatures = props.readings.filter(reading => reading.sensorId === specificId )
    
    // Find most recent temperature
    const hottestTemp = temperatures.sort((a, b) => new Date(a.time) > new Date(b.time) ? -1 : new Date(a.time) < new Date(b.time) ? 1 : 0)
    
    return hottestTemp.length > 0 ? hottestTemp[0].value : "No readings";
  }
  
  // Find the sensors tied to this room, create new array to render Sensor component
  const currentSensor = []
  for (const roomSensor of props.roomSensors) {
    currentSensor.push(...props.sensors.filter(sensor => sensor.id === roomSensor))
  }
  console.log("current?", currentSensor);
  
  return (
    <div>
      <div className="room-title">{props.room}</div>
      <img src={props.image} alt="Avatar" onClick={() => props.onChange(props.room)}/>    
      <div className="measurement-container">  
        {currentSensor.map(sensor => {
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
