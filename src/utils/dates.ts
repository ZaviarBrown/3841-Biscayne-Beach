import {
    eachDayOfInterval,
    isWithinInterval,
    isFriday,
    isSaturday,
    isBefore,
    isAfter,
} from "date-fns";

// TODO: Get timezones working
// import { utcToZonedTime } from "date-fns-tz";
// import { set, getYear, getMonth, getDate } from "date-fns";
// export const convertToCST = (localDate: Date) => {
//     const year = getYear(localDate);
//     const month = getMonth(localDate);
//     const day = getDate(localDate);

//     const utcMilliseconds = Date.UTC(year, month, day);

//     const cst = utcToZonedTime(utcMilliseconds, "America/Chicago");

//     return cst;
// };

// export const convertToLocal = (utcDate: Date) => {
//     const year = getYear(utcDate);
//     const month = getMonth(utcDate);
//     const day = getDate(utcDate);

//     return new Date(year, month, day);
// };

interface PricingWindowType {
    id: string;
    startDate: Date;
    endDate: Date;
    price: number;
    note: string;
}

interface GetAllPricesType {
    defaultPrice: number;
    weekendPrice: number;
    customPrices: PricingWindowType[];
}

interface UserSelectedDatesType {
    from: Date;
    to: Date;
}

export const calculateTotalPrice = (
    { defaultPrice, weekendPrice, customPrices }: GetAllPricesType,
    { from, to }: UserSelectedDatesType,
    taxRate = 1.085
): number => {
    let totalPrice = 0;
    let currentPricingWindow = 0;
    const endOfWindow = customPrices.length;

    eachDayOfInterval({
        start: from,
        end: to,
    }).forEach((selectedDay) => {
        let priceForTheDay = defaultPrice;

        if (isFriday(selectedDay) || isSaturday(selectedDay)) {
            priceForTheDay = weekendPrice;
        }

        while (currentPricingWindow < endOfWindow) {
            const { startDate, endDate, price } = customPrices[
                currentPricingWindow
            ] as PricingWindowType;

            const dateIsBeforeWindow = isBefore(selectedDay, startDate);
            const dateIsAfterWindow = isAfter(selectedDay, endDate);
            const dateIsWithinWindow = isWithinInterval(selectedDay, {
                start: startDate,
                end: endDate,
            });

            if (dateIsBeforeWindow) break;
            if (dateIsAfterWindow) currentPricingWindow++;
            if (dateIsWithinWindow) {
                priceForTheDay = price;
                break;
            }
        }

        totalPrice += priceForTheDay;
    });

    return totalPrice * taxRate;
};
