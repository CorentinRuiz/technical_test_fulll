import { FleetRepository } from "../../Infra/repositories/fleet.repository";
import { GeoLocation } from "../../Domain/value-objects/geolocation.vo";

class VehicleQueriesService {
  constructor(
    private fleetRepository: FleetRepository = FleetRepository.getInstance()
  ) {}

  localizeVehicle(fleetID: string, plateNumber: string): GeoLocation {
    const fleet = this.fleetRepository.getFleetById(fleetID);

    if (!fleet) {
      throw new Error("Fleet not found");
    }

    if (!fleet.findVehicle(plateNumber)) {
      throw new Error("Vehicle not found");
    }

    let location = fleet.localizeVehicle(plateNumber);

    if (location === undefined) {
      throw new Error("Vehicle is registered but not parked");
    }

    return location;
  }
}

export { VehicleQueriesService };