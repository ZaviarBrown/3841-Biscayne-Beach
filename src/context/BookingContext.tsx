import { createContext, useContext, useState, useEffect, useRef } from "react";

import type { ReactNode } from "react";
import type { Booking } from "@prisma/client";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export interface BookingContextType {
    booking: Booking | null;
    setBooking: (booking: Booking) => void;
    timeLeft: number;
    checkoutComplete: () => void; // Function to call when user completes checkout
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(9);
    const [booking, setBooking] = useState<Booking | null>(null);

    const timerId = useRef<NodeJS.Timeout | null>(null);

    const { mutate: deletePendingBooking } = api.booking.delete.useMutation({
        onSuccess: () => {
            void router.push("/");
        },
    });

    // Start timer when a booking is set
    useEffect(() => {
        if (booking) {
            setTimeLeft(9);
            timerId.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (timerId.current) clearInterval(timerId.current);
        };
    }, [booking]);

    // End checkout session if timeLeft hits 0
    useEffect(() => {
        if (timeLeft <= 0 && booking) {
            clearInterval(timerId.current as NodeJS.Timeout);
            deletePendingBooking(booking.id);
        }
    }, [timeLeft, booking, deletePendingBooking]);

    const checkoutComplete = () => {
        clearInterval(timerId.current as NodeJS.Timeout);
        setTimeLeft(9);
    };

    return (
        <BookingContext.Provider
            value={{ booking, setBooking, timeLeft, checkoutComplete }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => useContext(BookingContext);
