import { api } from "~/utils/api";
import CreatePricingWindow from "../Pricing/Create";

export default function AdjustPricing() {
    const { data: pricingWindows, isLoading } =
        api.pricing.getAllValidWindows.useQuery();

    if (isLoading) return <h1>Loading...</h1>;

    if (!pricingWindows) return null;

    return (
        <form className="m-5 flex w-96 flex-col items-center gap-10 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <CreatePricingWindow customPrices={pricingWindows.customPrices} />
            <h2 className="text-xl">Pending...</h2>
        </form>
    );
}
