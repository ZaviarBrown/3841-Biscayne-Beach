import { useRouter } from "next/router";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { useEffect, useState } from "react";
import { useBookingContext } from "~/context/BookingContext";
import { HashLoader } from "react-spinners";
import BookingSideCard from "~/components/Booking/SideCard";
import Image from "next/image";
import { useMobileContext } from "~/context/MobileContext";

// TODO: getServerSideProps

// TODO: This is a hot mess please refactor this dear god

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC);

const formatTimeLeft = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function ConfirmAndPay() {
    const router = useRouter();
    const { isMobile } = useMobileContext();
    const [clientSecret, setClientSecret] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const [startFade, setStartFade] = useState(false);
    const [startSlide, setStartSlide] = useState(false);

    const { booking, setBooking, timeLeft } = useBookingContext();

    const { data: restoreBooking, isLoading } = api.booking.getById.useQuery(
        router.query.id as string,
        { enabled: !!router.query.id }
    );

    const { mutate: createCheckout } =
        api.stripe.createCheckoutSession.useMutation({
            onSuccess: (checkoutSession) => {
                setClientSecret(checkoutSession.client_secret ?? "");
            },
        });

    useEffect(() => {
        if (booking && !clientSecret) {
            createCheckout({
                id: booking.id,
                priceId: booking.priceId as string,
            });
        }
    }, [booking, clientSecret, createCheckout]);

    useEffect(() => {
        if (!booking && restoreBooking) {
            setBooking(restoreBooking);
        }
    }, [booking, restoreBooking, setBooking]);

    useEffect(() => {
        if (booking && clientSecret) {
            setStartFade(true);
            const hideLoading = setTimeout(() => setShowLoading(false), 750);
            const showSliding = setTimeout(() => setStartSlide(true), 800);

            return () => {
                clearTimeout(hideLoading);
                clearTimeout(showSliding);
            };
        }
    }, [booking, clientSecret]);

    if (!isLoading && !booking && !restoreBooking) {
        void router.push("/");
        return null;
    }

    if (isLoading || !booking || !clientSecret || showLoading) {
        return (
            <div
                className={`flex h-screen w-screen items-center justify-center bg-white`}
            >
                <HashLoader
                    className={`transition-opacity duration-700 ${
                        startFade ? "opacity-0" : "opacity-100"
                    }`}
                    size={100}
                    color="#149BD6"
                />
            </div>
        );
    }

    if (isMobile)
        return (
            <>
                <div className="flex min-h-screen flex-col justify-between bg-white">
                    <div
                        className={`flex h-full text-2xl text-slate-200 transition-transform ${
                            startSlide ? "-translate-y-0" : "-translate-y-full"
                        } flex-col items-center justify-start gap-5 bg-[#0074D4] p-5 duration-1000`}
                    >
                        <h1 className="text-4xl md:text-6xl">
                            {formatTimeLeft(timeLeft)}
                        </h1>

                        <div className="relative h-36 w-44 rounded-3xl shadow-3xl">
                            <Image
                                src={"/images/house-3.jpg"}
                                alt={"Front view of house"}
                                className="rounded-3xl object-cover"
                                fill
                            />
                        </div>

                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl">
                                Confirm and pay
                            </h1>
                        </div>

                        <BookingSideCard {...booking} />
                    </div>
                    <div
                        className={`z-10 h-full bg-white p-10 transition-opacity duration-1000 ${
                            startSlide ? "opacity-100" : "opacity-0"
                        } shadow-4xlL`}
                    >
                        {clientSecret && (
                            <EmbeddedCheckoutProvider
                                stripe={stripePromise}
                                options={{ clientSecret }}
                            >
                                <EmbeddedCheckout />
                            </EmbeddedCheckoutProvider>
                        )}
                    </div>
                </div>
            </>
        );
    else
        return (
            <>
                <div className="flex min-h-screen justify-between bg-white">
                    <div
                        className={`flex w-full text-2xl text-slate-200 transition-transform ${
                            startSlide ? "-translate-x-0" : "-translate-x-full"
                        } flex-col items-center justify-start gap-5 bg-[#0074D4] p-5 duration-1000`}
                    >
                        <h1 className="text-6xl">{formatTimeLeft(timeLeft)}</h1>

                        <div className="relative h-1/5 w-1/2 rounded-3xl shadow-3xl">
                            <Image
                                src={"/images/house-3.jpg"}
                                alt={"Front view of house"}
                                className="rounded-3xl object-cover"
                                fill
                            />
                        </div>

                        <div className="text-center">
                            <h1 className="text-4xl">Confirm and pay</h1>
                        </div>

                        <BookingSideCard {...booking} />
                    </div>
                    <div
                        className={`z-10 w-full bg-white p-10 transition-opacity duration-1000 ${
                            startSlide ? "opacity-100" : "opacity-0"
                        } shadow-4xlL`}
                    >
                        {clientSecret && (
                            <EmbeddedCheckoutProvider
                                stripe={stripePromise}
                                options={{ clientSecret }}
                            >
                                <EmbeddedCheckout />
                            </EmbeddedCheckoutProvider>
                        )}
                    </div>
                </div>
            </>
        );
}
