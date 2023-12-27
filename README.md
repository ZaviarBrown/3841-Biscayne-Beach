# Whiteboard

## User stories

### As a logged out user, I want to

- See NavBar with "Book Now", "House Rules", and "Reviews"
- See Login Button
- See home page with house photos
  - Scroll down to see
    - Google Maps
    - Nearby attractions
    - "Book Now" button
      - Should trigger login function
- See footer with "Privacy Policy", "Terms of Service", and "Contact Us"

### As a standard logged in user, I want to

- See same as logged out user
- See profile icon, when clicked can see
  - "Hi Zaviar!"
  - My Bookings
  - Log out
- When clicking "Book Now"
  - Taken to page with Calendar
    - Choose dates
    - How many people are staying
    - Extra contact info
    - Submit
  - Policy agreement popup
    - Have you read the house rules?
    - By clicking this box, you agree to our Terms and Conditions
    - Submit
  - Taken to stripe checkout page
    - 15 minutes to make it official
    - Submit
  - Taken to confirmation page
    - Thanks for booking
    - You should receive an email
    - Looking forward to you staying with us
  - Should receive an email from their linked google account
- When clicking "My Bookings"
  - Taken to page with bookings and reviews
    - Upcoming bookings | Update/Cancel this booking
    - Past bookings | Review Data / Create Review

### As an admin logged in user, I want to

- See same as logged in/out user
- Profile icon, when clicked can see
  - "Hi Zaviar!"
  - _`-- Admin --`_
    - Manage bookings
    - Manage pricing
    - Manage reviews
    - Manage messages
  - Personal Bookings
  - Log out
- When clicking "Manage bookings"
  - Taken to page with all bookings
    - Upcoming bookings | Update/Cancel this booking
    - Past bookings
- When clicking "Manage pricing"
  - Taken to a page with Calendar & pricing windows
    |-pricing-| Calendar
    |----X----| ----------
    |-windows-| Price Input
  - Calendar / Price Input
    - Create price window
      - No conflicting windows / existing bookings
  - Pricing windows
    - Update & Delete
      - No conflicting windows / existing bookings
- When clicking "Manage reviews"
  - Taken to page with all reviews
    - Approve | Hide | Delete
- When clicking "Manage messages"
  - Taken to page with all messages
    - Unresolved
    - Resolved

## Custom pricing

DB table 'Pricing' w/ special dates

- startDate
- endDate
- price
- note

null date === default price or Fri/Sat price

prices.getAllFuture(today) => {default, weekend, customPrices: []}

Want to avoid On^2

- Loop through selectedDates
- Don't re-check a customPrice
- Pricing order:
  1. if between startDate and endDate use custom
  2. if Fri/Sat use weekend
  3. use default

totalPrice = 0
currCustom = 0
end = customPrices.length

selectedDates.forEach =>
while currCustom < end
pricingWindow = customPrices[currCustom]
selectedDate gte pricingWindow.startDate && lte pricingWindow.endDate
? use price
: skip && currCustom++

## Old plan but still kind of current plan

When creating a booking:

- Use calcTotalPrice to get total price
  - Default taxRate is 1.085 (8.5%)
- Create a new price in Stripe with that amount
- Charge that price for this booking

## Time zone issue - let's come back to this

User's time zone is used for calendar

CST dates are what the booking goes off of

User should see booked dates, but local dates could differ from CST dates

Set dates as 12am CST, store dates as UTC

DB UTC dates => Local dates
