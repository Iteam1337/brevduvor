@booking
Feature: Booking

  User can book a trip

  Background:
    Given I open the boka-resa page

  Scenario: User can book a trip
    When I select "Storuman" as "from"
    And I select "Slussfors" as "to"
    Then I should see the "Förbered bokning" button
    When I press "Förbered bokning"
    Then I should see the "Du har nu förberett din bokning." text