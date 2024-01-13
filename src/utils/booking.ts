import {
    eachDayOfInterval,
    isWithinInterval,
    isFriday,
    isSaturday,
    isBefore,
    isAfter,
} from "date-fns";
import { env } from "~/env.mjs";
import type { PricingWindowType } from "~/server/api/routers/pricing";
import type { RouterOutputs } from "~/utils/api";

export type GetAllPricesType = RouterOutputs["pricing"]["getAllValidWindows"];

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

interface UserSelectedDatesType {
    from: Date;
    to: Date;
}

export const calculateSubtotal = (
    { defaultPrice, weekendPrice, customPrices }: GetAllPricesType,
    { from, to }: UserSelectedDatesType
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

    return totalPrice * Number(env.NEXT_PUBLIC_PURCHASE_FEE);
};

export const convertCentsIntoDollars = (price: number) => {
    const centString = Math.ceil(price).toString();

    const dollars = centString.slice(0, -2);
    const cents = centString.slice(-2);

    return `$${dollars}.${cents}`;
};

export const convertDollarsIntoCents = (price: string) => {
    if (price.at(0) === "$") price = price.slice(1);

    return Number(price.split(".").join(""));
};
