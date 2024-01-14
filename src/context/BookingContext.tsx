import { createContext, useContext, useState, useEffect, useRef } from "react";

import type { ReactNode } from "react";
import type { Booking } from "@prisma/client";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { add, differenceInSeconds } from "date-fns";

export interface BookingContextType {
    booking: Booking | null;
    setBooking: (booking: Booking) => void;
    timeLeft: number;
    checkoutComplete: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(900);
    const [booking, setBooking] = useState<Booking | null>(null);

    const timerId = useRef<NodeJS.Timeout | null>(null);

    const { mutate: deletePendingBooking } =
        api.booking.deletePending.useMutation({
            onSuccess: () => {
                void router.push("/");
            },
        });

    useEffect(() => {
        if (booking) {
            const expiration = add(booking.createdAt, { minutes: 15 });
            const now = new Date();

            const seconds = differenceInSeconds(expiration, now);

            setTimeLeft(seconds);

            timerId.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (timerId.current) clearInterval(timerId.current);
        };
    }, [booking]);

    useEffect(() => {
        if (timeLeft <= 0 && booking && booking.status === "pending") {
            clearInterval(timerId.current as NodeJS.Timeout);
            deletePendingBooking(booking.id);
        }
    }, [timeLeft, booking, deletePendingBooking]);

    const checkoutComplete = () => {
        clearInterval(timerId.current as NodeJS.Timeout);
        setTimeLeft(900);
    };

    return (
        <BookingContext.Provider
            value={{ booking, setBooking, timeLeft, checkoutComplete }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () =>
    useContext(BookingContext) as BookingContextType;
