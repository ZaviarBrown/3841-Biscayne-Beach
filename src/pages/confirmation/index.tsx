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
    return <div>{`Confirm your booking from ${from} to ${to}`}</div>;
}
