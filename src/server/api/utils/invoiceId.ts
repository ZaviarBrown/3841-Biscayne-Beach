function decimalToBase64(decimalNumber: number): string {
    if (typeof decimalNumber !== "number" || !Number.isInteger(decimalNumber)) {
        throw new Error("Input must be an integer.");
    }

    const base64Digits =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let base64String = "";

    if (decimalNumber === 0) {
        return "A";
    }

    while (decimalNumber > 0) {
        const remainder = decimalNumber % 64;
        base64String = base64Digits.charAt(remainder) + base64String;
        decimalNumber = Math.floor(decimalNumber / 64);
    }

    return base64String;
}

export default function generateInvoiceId(bookingId: string, createdAt: Date) {
    const firstHalf = bookingId.slice(0, 10);
    const secondHalf = decimalToBase64(createdAt.getTime());

    return firstHalf + secondHalf;
}
