import { Vehicle } from "./vehicle.entity";
import { GeoLocation } from "../value-objects/geolocation.vo";

class Fleet {
  constructor(
    public fleetID: string,
    public userID: string,
    public vehicles: Vehicle[]
  ) {}

  addVehicle(vehicle: Vehicle) {
    if (this.vehicles.find((v) => v.plateNumber === vehicle.plateNumber)) {
      throw new Error("Vehicle already exists in fleet");
    }
    this.vehicles.push(vehicle);
  }

  parkVehicle(plateNumber: string, location: GeoLocation) {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.plateNumber === plateNumber
    );
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    vehicle.location = location;

    return vehicle;
  }

  localizeVehicle(plateNumber: string): GeoLocation | undefined {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.plateNumber === plateNumber
    );
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle.location;
  }

  findVehicle(plateNumber: string): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.plateNumber === plateNumber);
  }
  
}

export { Fleet };
