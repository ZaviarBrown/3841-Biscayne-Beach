import { api } from "~/utils/api";
import CreatePricingWindow from "../Pricing/Create";

export default function AdjustPricing() {
    const { data: pricingWindows, isLoading } =
        api.pricing.getAllValidWindows.useQuery();

    if (isLoading) return <h1>Loading...</h1>;

    if (!pricingWindows) return null;

    return (
        <div className="flex h-full flex-col gap-5">
            <InfoCard />

            <CreatePricingWindow customPrices={pricingWindows.customPrices} />
        </div>
    );
}

const InfoCard = () => {
    return (
        <div className="flex w-full items-center justify-evenly rounded-lg bg-white p-3 text-center shadow-lg">
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-green-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$0.00</span>
                <p className="text-sm text-slate-500">All-Time Revenue</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-green-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$0.00</span>
                <p className="text-sm text-slate-500">Revenue This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-red-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$0.00</span>
                <p className="text-sm text-slate-500">All-Time Refunds</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-red-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$0.00</span>
                <p className="text-sm text-slate-500">Refunds This Year</p>
            </div>
        </div>
    );
};
