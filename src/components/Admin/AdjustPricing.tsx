import { api } from "~/utils/api";
import CreatePricingWindow from "../Pricing/Create";

export default function AdjustPricing() {
    const { data: pricingWindows, isLoading } =
        api.pricing.getAllValidWindows.useQuery();

    if (isLoading) return <h1>Loading...</h1>;

    if (!pricingWindows) return null;

    return <CreatePricingWindow customPrices={pricingWindows.customPrices} />;
}
