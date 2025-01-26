import { Fleet } from "../../Domain/model/fleet.entity";

// Repository to handle fleets with local storage
class FleetRepository {
  private static instance: FleetRepository;
  private fleets: Fleet[] = [];

  private constructor() {}

  static getInstance(): FleetRepository {
    if (!FleetRepository.instance) {
      FleetRepository.instance = new FleetRepository();
    }
    return FleetRepository.instance;
  }

  addFleet(fleet: Fleet): void {
    this.fleets.push(fleet);
  }

  getFleetById(fleetID: string): Fleet | undefined {
    return this.fleets.find((fleet) => fleet.fleetID === fleetID);
  }

  getFleetByUserId(userID: string): Fleet | undefined {
    return this.fleets.find((fleet) => fleet.userID === userID);
  }

  updateFleet(fleet: Fleet): void {
    const index = this.fleets.findIndex((f) => f.fleetID === fleet.fleetID);
    this.fleets[index] = fleet;
  }
}

export { FleetRepository };