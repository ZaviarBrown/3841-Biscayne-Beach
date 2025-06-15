export default function ButtonBanner() {
    return (
        <div className="flex items-center justify-center bg-bg py-8">
            {/* Left Line */}
            <div className="flex-grow border-t border-gray-300"></div>

            {/* Buttons */}
            <div className="mx-6 flex space-x-4">
                <a
                    href="/schedule-a-tour/"
                    target="_self"
                    className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-800"
                >
                    Book A Tour
                </a>
                <a
                    href="https://carsontownhomes.securecafe.com/onlineleasing/carson-the/floorplans.aspx"
                    target="_blank"
                    className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-800"
                >
                    Apply Today
                </a>
            </div>

            {/* Right Line */}
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
}
