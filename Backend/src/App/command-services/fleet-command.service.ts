import { FleetRepository } from "../../Infra/repositories/fleet.repository";
import { FleetFactory } from "../../Domain/factories/fleet.factory";

class FleetCommandService {
  constructor(
    private fleetRepository: FleetRepository = FleetRepository.getInstance(),
  ) {}

  create(userId: string): string {
    if (this.fleetRepository.getFleetByUserId(userId)) {
      throw new Error("User already has a fleet");
    }

    let newFleet = FleetFactory.createFleet(userId);

    this.fleetRepository.addFleet(newFleet);

    return newFleet.fleetID;
  }
  
}

export { FleetCommandService };
