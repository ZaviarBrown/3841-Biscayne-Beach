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

- get all after today, ordered by date
- get default & weekend
- Set currPrice to defaultPrice
- iterate through booking dates:
  - If Fri || Sat, currPrice = 450
  - iterate through custom prices
    - If date found, add custom price
    - If not, add default price
- For final price add 8.5% tax
- Create a new price in Stripe with that amount
- Charge that price for this booking
