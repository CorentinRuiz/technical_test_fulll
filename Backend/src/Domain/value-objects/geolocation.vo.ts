class GeoLocation {
  constructor(public readonly lat: number, public readonly lng: number) {}

  equals(other: GeoLocation): boolean {
    return this.lat === other.lat && this.lng === other.lng;
  }
}

export { GeoLocation };