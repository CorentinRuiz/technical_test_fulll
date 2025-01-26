import { FleetRepository } from "../../Infra/repositories/fleet.repository";
import { GeoLocation } from "../../Domain/value-objects/geolocation.vo";

class FleetQueriesService {
  constructor(
    private fleetRepository: FleetRepository = FleetRepository.getInstance()
  ) {}

  // Get the fleet ID with an User ID
  getFleetIdByUserId(userId: string): string {
    const fleet = this.fleetRepository.getFleetByUserId(userId);
  
    if (!fleet) {
      throw new Error("Fleet not found");
    }
  
    return fleet.fleetID;
  }
  
}

export { FleetQueriesService };
