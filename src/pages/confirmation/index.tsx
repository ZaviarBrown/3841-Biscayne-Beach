import { api } from "~/utils/api";

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
    const { mutate } = api.example.testCharge.useMutation();

    return (
        <>
            <div>{`Confirm your booking from ${from} to ${to}`}</div>
            <button onClick={() => mutate()}>
                Click here to test this weird ass API
            </button>
        </>
    );
}
