Feature: Fleet management

  Scenario: Create a new fleet
    Given a user with ID "user123"
    When the user creates a fleet
    Then the fleet should be created successfully

  Scenario: Register a vehicle in a fleet
    Given a user with ID "user123" and a createdFleet
    When the user registers a vehicle with plate number "ABC123"
    Then the vehicle should be registered successfully

  Scenario: Park a vehicle in a fleet
    Given a user with ID "user123", a created fleet, and a registered vehicle with plate number "ABC123"
    When the user parks the vehicle at location "48.8566,2.3522"
    Then the vehicle should be parked successfully

  Scenario: Localize a vehicle in a fleet
    Given a user with ID "user123", a created fleet, and a parked vehicle with plate number "ABC123"
    When the user localizes the vehicle
    Then the vehicle location should be "48.8566,2.3522"

  Scenario: Error when creating a fleet for a user who already has a fleet
    Given a user with ID "user123" and a createdFleet
    When the user creates a fleet again
    Then an error should be returned with message "User already has a fleet"

  Scenario: Error when registering a vehicle that already exists in the fleet
    Given a user with ID "user123", a created fleet, and a registered vehicle with plate number "ABC123"
    When the user registers a vehicle with plate number "ABC123" again
    Then an error should be returned with message "Vehicle already exists in fleet"

  Scenario: Error when parking a vehicle that is not registered in the fleet
    Given a user with ID "user123" and a createdFleet
    When the user parks the vehicle with plate number "XYZ789" at location "48.8566,2.3522"
    Then an error should be returned with message "Vehicle not found"
