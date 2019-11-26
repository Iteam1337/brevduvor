@booking
Feature: Booking

  User can book a trip

  Background:
    Given I login
    Given I open the boka-resa page

  Scenario: User can book a trip
    When I select "Storuman" as "from"
    And I select "Slussfors" as "to"
    Then I should see the "Prepare trip" button
    When I press "Prepare trip"
    Then I should see the "This trip has been prepared" text
