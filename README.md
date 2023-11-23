# Pricing plan

DB table 'Pricing' w/ special dates

- date
- price

First date is new Date(0), $300

When creating a booking:

- get all after today, ordered by date
- get default
- iterate through pricing dates
  - If date found, add custom price
  - If not, add default price
- For final price add 8.5% tax
- Create a new price in Stripe with that amount
- Charge that price for this booking
