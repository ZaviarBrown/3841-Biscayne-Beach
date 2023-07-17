const GuestInfo = () => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Your Information</h2>
            <form>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Full Name
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Email Address
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="john.doe@example.com"
                    />
                </div>
            </form>
        </div>
    );
};

export default GuestInfo;
