import type { RouterOutputs } from "~/utils/api";
import { convertCentsIntoDollars } from "~/utils/booking";

type FullCancelledDetailsType = RouterOutputs["booking"]["getAllCancelled"][0];

export default function CancelledBookingCard({
    refundId,
    user: { name, email },
    cancelDate,
    refundPrice,
}: FullCancelledDetailsType) {
    return (
        <>
            <p>{refundId}</p>
            <p>{name}</p>
            <p className="flex flex-wrap justify-center">
                {email ? (
                    <>
                        <span> {`${email.split("@")[0] || "not found"}`}</span>
                        <span>{`@${email.split("@")[1] || "gmail.com"}`}</span>
                    </>
                ) : (
                    "unknown"
                )}
            </p>
            <p>{cancelDate.toLocaleDateString()}</p>
            <p>{convertCentsIntoDollars(refundPrice)}</p>
        </>
    );
}
