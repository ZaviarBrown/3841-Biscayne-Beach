import {
    eachDayOfInterval,
    isWithinInterval,
    isFriday,
    isSaturday,
    isBefore,
    isAfter,
    subDays,
} from "date-fns";
import { env } from "~/env.mjs";
import type { PricingWindowType } from "~/server/api/routers/pricing";
import type { RouterOutputs } from "~/utils/api";

export type GetAllPricesType = RouterOutputs["pricing"]["getAllValidWindows"];

import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

export const convertToUTCNoonCST = (dateInput: Date) => {
    const cstTimeZone = "America/Chicago";

    const cstDate = utcToZonedTime(dateInput, cstTimeZone);
    cstDate.setHours(19, 0, 0, 0); // Set to 12 PM CST

    const utcDate = zonedTimeToUtc(cstDate, cstTimeZone);

    return format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};

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

    // Calculate price by number of nights
    const finalNight = subDays(to, 1);

    eachDayOfInterval({
        start: from,
        end: finalNight,
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
