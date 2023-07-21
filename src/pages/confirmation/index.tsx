import { api } from "~/utils/api";
import GuestInfo from "../../components/Confirmation/GuestInfo";
import PaymentMethod from "../../components/Confirmation/PaymentMethod";
import BookingSummary from "../../components/Confirmation/BookingSummary";
import { useState } from "react";
import { useRouter } from "next/router";

interface BookingRouter {
    query: {
        startDate: string;
        endDate: string;
        totalPrice: string;
    };
}

// // TODO:
// export const getServerSideProps = ({ query }: { query: Booking }) => {
//     return {
//         props: {
//             from: query.from,
//             to: query.to,
//         },
//     };
// };

// export default function Confirmation({ from, to }: Booking) {
export default function Confirmation() {
    const { query: data } = useRouter() as unknown as BookingRouter;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstCCNums, setFirstCCNums] = useState("");
    const [secondCCNums, setSecondCCNums] = useState("");
    const [thirdCCNums, setThirdCCNums] = useState("");
    const [fourthCCNums, setFourthCCNums] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cardCode, setCardCode] = useState("");

    const { mutate } = api.bookings.createBooking.useMutation();

    return (
        <div className="App">
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
                            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                            type="button"
                            onClick={() =>
                                mutate({
                                    name,
                                    email,
                                    startDate: new Date(data.startDate),
                                    endDate: new Date(data.endDate),
                                    cardNumber: `${
                                        firstCCNums +
                                        secondCCNums +
                                        thirdCCNums +
                                        fourthCCNums
                                    }`,
                                    expDate: `${expMonth + "/" + expYear}`,
                                    cardCode,
                                    totalPrice: Number(data.totalPrice),
                                })
                            }
                        >
                            Confirm and Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
