const obj = {
  name: 'test',
  color: 'test',
  id: 404,
};

export default function updateObjToBuffer(
  nameCar: string,
  colorCar: string,
  idCar: number,
) {
  obj.name = nameCar;
  obj.color = colorCar;
  obj.id = idCar;
}

export function getCarFormBuffer() {
  return obj;
}
