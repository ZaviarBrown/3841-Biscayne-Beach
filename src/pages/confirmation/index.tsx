import { api } from "~/utils/api";
import GuestInfo from "../../components/Confirmation/GuestInfo";
import PaymentMethod from "../../components/Confirmation/PaymentMethod";
import BookingSummary from "../../components/Confirmation/BookingSummary";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface BookingRouter {
    query: {
        startDate: string;
        endDate: string;
        totalPrice: string;
    };
}

export default function Confirmation() {
    const router = useRouter();
    const { query: data } = router as unknown as BookingRouter;
    const { data: session } = useSession(); // status is probably useful

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstCCNums, setFirstCCNums] = useState("");
    const [secondCCNums, setSecondCCNums] = useState("");
    const [thirdCCNums, setThirdCCNums] = useState("");
    const [fourthCCNums, setFourthCCNums] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cardCode, setCardCode] = useState("");

    const [inProgress, setInProgress] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (
            cardCode.length >= 3 &&
            (expMonth + expYear).length >= 4 &&
            (firstCCNums + secondCCNums + thirdCCNums + fourthCCNums).length >=
                8 &&
            name &&
            email
        )
            setInProgress(false);
        else setInProgress(true);
    }, [
        firstCCNums,
        secondCCNums,
        thirdCCNums,
        fourthCCNums,
        expMonth,
        expYear,
        cardCode,
        name,
        email,
    ]);

    const { mutate: createBooking } = api.booking.create.useMutation({
        onSuccess: () => router.push("/"),
    });

    const confirmAndPay = () => {
        if (session && session.user) {
            createBooking({
                bookingInfo: {
                    userId: session.user.id,
                    name,
                    email,
                    startDate: new Date(Number(data.startDate)),
                    endDate: new Date(Number(data.endDate)),
                },
                cardInfo: {
                    cardNum: `${
                        firstCCNums + secondCCNums + thirdCCNums + fourthCCNums
                    }`,
                    expDate: `${expMonth + expYear}`,
                    cardCode,
                    totalPrice: Number(data.totalPrice),
                },
            });
        }
    };

    if (processing)
        return (
            <div className="flex items-center justify-center">
                Secure Transaction Screen
            </div>
        );

    return (
        <>
            {!session ? (
                <Link href={"/"}>{"Whoops, let's get you logged in"}</Link>
            ) : session?.user && !data.startDate ? (
                <Link href={"/"}>
                    {"How'd you get here?! Let's get you back home"}
                </Link>
            ) : (
                session?.user &&
                data.startDate && (
                    <div className="flex">
                        <div className="w-3/5 p-10">
                            <GuestInfo
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                            />
                            <PaymentMethod
                                firstCCNums={firstCCNums}
                                setFirstCCNums={setFirstCCNums}
                                secondCCNums={secondCCNums}
                                setSecondCCNums={setSecondCCNums}
                                thirdCCNums={thirdCCNums}
                                setThirdCCNums={setThirdCCNums}
                                fourthCCNums={fourthCCNums}
                                setFourthCCNums={setFourthCCNums}
                                expMonth={expMonth}
                                setExpMonth={setExpMonth}
                                expYear={expYear}
                                setExpYear={setExpYear}
                                cardCode={cardCode}
                                setCardCode={setCardCode}
                            />
                        </div>
                        <div className="w-2/5 bg-gray-100 p-10">
                            <BookingSummary {...data} />
                            <div className="flex justify-center">
                                <button
                                    className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-slate-300 disabled:text-slate-500"
                                    type="button"
                                    disabled={submitted || inProgress}
                                    onClick={() => {
                                        setProcessing(true);
                                        setSubmitted(true);
                                        confirmAndPay();
                                    }}
                                >
                                    Confirm and Pay
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
