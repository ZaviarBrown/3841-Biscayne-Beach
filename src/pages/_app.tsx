import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "react-day-picker/dist/style.css";
import Layout from "~/components/layout";
import { BookingContextProvider } from "~/context/BookingContext";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <BookingContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </BookingContextProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
