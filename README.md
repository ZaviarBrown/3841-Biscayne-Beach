# Custom pricing whiteboard

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