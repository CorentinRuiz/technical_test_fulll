import { GeoLocation } from '../value-objects/geolocation.vo';

class Vehicle {
  constructor(public plateNumber: string, public location?: GeoLocation) {}
}

export { Vehicle };