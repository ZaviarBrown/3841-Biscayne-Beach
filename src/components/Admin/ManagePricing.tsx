import { api } from "~/utils/api";
import CreatePricingWindow from "../Pricing/Create";
import { convertCentsIntoDollars } from "~/utils/booking";
import { useState } from "react";
import DeletePricingWindow from "../Pricing/Delete";

type SubPagesType = "existing" | "create";

export default function ManagePricing() {
    const { data: pricingWindow, isLoading } =
        api.pricing.getAllValidWindows.useQuery();
    const [subPage, setSubPage] = useState<SubPagesType>("existing");

    if (isLoading) return <h1>Loading...</h1>;

    if (!pricingWindow) return null;

    return (
        <div className="flex h-full flex-col gap-5">
            <InfoCard />
            <div className="flex h-full flex-col rounded-lg bg-slate-100 text-black shadow-3xl">
                <div className="flex h-16 w-full items-center justify-evenly rounded-t-lg border-b border-slate-500 bg-white text-center text-xl">
                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "existing"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("existing")}
                    >
                        Existing
                    </p>

                    <span className="h-12 border-r" />

                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "create"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("create")}
                    >
                        Create
                    </p>
                </div>
                <div className="flex h-16 w-full items-center justify-evenly bg-slate-600 px-5 text-center text-xl text-white">
                    <div className="w-full p-2">
                        <p>
                            Default Price:{" "}
                            {convertCentsIntoDollars(
                                pricingWindow.defaultPrice
                            )}
                        </p>
                    </div>

                    <span className="h-8 border-r border-white" />

                    <div className="w-full p-2">
                        <p>
                            Weekend Price:{" "}
                            {convertCentsIntoDollars(
                                pricingWindow.weekendPrice
                            )}
                        </p>
                    </div>
                </div>
                <div
                    className={`${
                        subPage === "existing" ? "opacity-100" : "opacity-0"
                    } transition duration-1000`}
                >
                    {subPage === "existing" && (
                        <>
                            <div className="grid grid-cols-6 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold ">
                                <p>Event</p>
                                <p>Price</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p># of Bookings</p>
                                <p>Delete</p>
                            </div>
                            {pricingWindow.customPrices.map(
                                (
                                    { id, startDate, endDate, price, note },
                                    i
                                ) => {
                                    return (
                                        <div
                                            className={`grid h-fit grid-cols-6  items-center p-2 text-center ${
                                                i % 2
                                                    ? "bg-slate-200"
                                                    : "bg-white"
                                            }`}
                                            key={id}
                                        >
                                            <p>{note}</p>
                                            <div>
                                                {convertCentsIntoDollars(price)}
                                            </div>

                                            <div>
                                                From{" "}
                                                {startDate.toLocaleDateString()}
                                            </div>
                                            <div>
                                                To{" "}
                                                {endDate.toLocaleDateString()}
                                            </div>
                                            <div>?</div>
                                            <DeletePricingWindow id={id} />
                                        </div>
                                    );
                                }
                            )}
                        </>
                    )}
                </div>

                <div
                    className={`${
                        subPage === "create" ? "opacity-100" : "opacity-0"
                    } transition duration-1000`}
                >
                    {subPage === "create" && (
                        <CreatePricingWindow
                            customPrices={pricingWindow.customPrices}
                        />
                    )}
                </div>
            </div>
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
                <span className="text-2xl font-bold">$?</span>
                <p className="text-sm text-slate-500">All-Time Revenue</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-green-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$?</span>
                <p className="text-sm text-slate-500">Revenue This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-red-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$?</span>
                <p className="text-sm text-slate-500">All-Time Refunds</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="m-auto h-8 w-8 rounded-full bg-red-500 bg-opacity-70 text-2xl">
                    {"💰"}
                </p>
                <span className="text-2xl font-bold">$?</span>
                <p className="text-sm text-slate-500">Refunds This Year</p>
            </div>
        </div>
    );
};
