import { FleetRepository } from "../../Infra/repositories/fleet.repository";
import { Vehicle } from "../../Domain/model/vehicle.entity";
import { GeoLocation } from "../../Domain/value-objects/geolocation.vo";

class VehicleCommandService {
  constructor(
    private fleetRepository: FleetRepository = FleetRepository.getInstance()
  ) {}

  registerVehicle(fleetID: string, plateNumber: string): Vehicle {
    const vehicle = new Vehicle(plateNumber);

    const fleet = this.fleetRepository.getFleetById(fleetID);

    if (!fleet) {
      throw new Error("Fleet not found");
    }

    if (fleet.findVehicle(plateNumber)) {
      throw new Error("Vehicle already exists in fleet");
    }

    fleet.addVehicle(vehicle);

    this.fleetRepository.updateFleet(fleet);

    return vehicle;
  }

  parkVehicle(
    fleetID: string,
    plateNumber: string,
    location: GeoLocation
  ): Vehicle {
    const fleet = this.fleetRepository.getFleetById(fleetID);

    if (!fleet) {
      throw new Error("Fleet not found");
    }

    let parkedVehicle = fleet.parkVehicle(plateNumber, location);

    this.fleetRepository.updateFleet(fleet);

    return parkedVehicle;
  }
}

export { VehicleCommandService };