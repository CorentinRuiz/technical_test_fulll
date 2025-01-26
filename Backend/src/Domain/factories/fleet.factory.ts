import { Fleet } from '../model/fleet.entity';

class FleetFactory {
  static createFleet(userID: string): Fleet {
    return new Fleet(FleetFactory.generateRandomID(), userID, []);
  }

  private static generateRandomID(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export { FleetFactory };
