interface ISensors {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  units: string;
}

export function currentSensor (roomSensors:number[], sensors:ISensors[]):(ISensors[]) {
  const currentSensor = []

  for (const roomSensor of roomSensors) {
    currentSensor.push(...sensors.filter(sensor => sensor.id === roomSensor))
  }

  return currentSensor
}