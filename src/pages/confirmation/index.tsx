import { api } from "~/utils/api";
import GuestInfo from "../../components/Confirmation/GuestInfo";
import PaymentMethod from "../../components/Confirmation/PaymentMethod";
import BookingSummary from "../../components/Confirmation/BookingSummary";
import ConfirmButton from "../../components/Confirmation/ConfirmButton";

interface Booking {
    from: string;
    to: string;
}

export const getServerSideProps = ({ query }: { query: Booking }) => {
    return {
        props: {
            from: query.from,
            to: query.to,
        },
    };
};

export default function Confirmation({ from, to }: Booking) {
    const { mutate } = api.payment.testCharge.useMutation();

    // return (
    //     <>
    //         <div>{`Confirm your booking from ${from} to ${to}`}</div>
    //         <button onClick={() => mutate()}>
    //             Click here to test this weird ass API
    //         </button>
    //     </>
    // );
    return (
        <div className="App">
            <div className="flex">
                <div className="w-3/5 p-10">
                    <GuestInfo />
                    <PaymentMethod />
                </div>
                <div className="w-2/5 bg-gray-100 p-10">
                    <BookingSummary />
                    <ConfirmButton />
                </div>
            </div>
        </div>
    );
}
