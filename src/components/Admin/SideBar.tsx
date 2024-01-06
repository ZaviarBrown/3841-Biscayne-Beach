import type { PagesType } from "~/pages/admin";

export default function SideBar({
    page,
    setPage,
}: {
    page: "bookings" | "pricing" | "users";
    setPage: React.Dispatch<React.SetStateAction<PagesType>>;
}) {
    return (
        <>
            <nav
                className="fixed h-screen w-48 border-r border-white bg-slate-700 text-xl text-white"
                aria-label="Sidebar navigation"
            >
                <ul className="mt-5 flex h-3/4 flex-col gap-5">
                    <li
                        className={`p-4 hover:cursor-pointer ${
                            page === "bookings"
                                ? "bg-slate-800"
                                : "transition-colors duration-200 hover:bg-slate-600"
                        }`}
                        onClick={() => setPage("bookings")}
                    >
                        📆 <span className="p-1" /> Bookings
                    </li>
                    <li
                        className={`p-4 hover:cursor-pointer ${
                            page === "pricing"
                                ? "bg-slate-800"
                                : "transition-colors duration-200 hover:bg-slate-600"
                        }`}
                        onClick={() => setPage("pricing")}
                    >
                        💰 <span className="p-1" /> Pricing
                    </li>
                    <li
                        className={`p-4 hover:cursor-pointer ${
                            page === "users"
                                ? "bg-slate-800"
                                : "transition-colors duration-200 hover:bg-slate-600"
                        }`}
                        onClick={() => setPage("users")}
                    >
                        👤 <span className="p-1" /> Users
                    </li>
                </ul>
            </nav>
            <div className="w-1/6" />
        </>
    );
}
