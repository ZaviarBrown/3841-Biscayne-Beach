const PaymentMethod = () => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>
            <form>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Card Number
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Expiry Date
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="MM/YY"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        CVV
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="XXX"
                    />
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;
