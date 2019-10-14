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



# And I type "gordon@example.com" as "email"
# When I press Fortsätt
# And I reload the page
# And I go back to "/skapa-cv/kontakt"
# Then My "name" should still be set as "Gordon Freeman"
# And My "email" should still be set as "gordon@example.com"

# TODO: Implement the skipped statements when we implement better form validation that is visable in the DOM
